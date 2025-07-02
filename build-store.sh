#!/bin/bash

# =============================================================================
# Stash Extension Store Build Script
# =============================================================================
# This script packages the Stash extension for submission to:
# - Chrome Web Store (when passed "chrome" parameter)
# - Mozilla Add-ons Store (when passed "firefox" parameter)
#
# Usage: ./build-store.sh [chrome|firefox]
# =============================================================================

set -e  # Exit on any error

# Color codes for pretty output
RED='\033[0;31m'
GREEN='\033[0;32m'  
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

print_header() {
    echo -e "${BLUE}🔧 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "   $1"
}

# =============================================================================
# PARAMETER VALIDATION
# =============================================================================

if [ $# -eq 0 ]; then
    print_error "No platform specified!"
    echo "Usage: $0 [chrome|firefox]"
    echo ""
    echo "Examples:"
    echo "  $0 chrome   - Build for Chrome Web Store"
    echo "  $0 firefox  - Build for Mozilla Add-ons Store"
    exit 1
fi

PLATFORM=$1

if [ "$PLATFORM" != "chrome" ] && [ "$PLATFORM" != "firefox" ]; then
    print_error "Invalid platform: $PLATFORM"
    echo "Please use 'chrome' or 'firefox'"
    exit 1
fi

# =============================================================================
# SETUP VARIABLES
# =============================================================================

print_header "Setting up build for $PLATFORM"

# Build directory names
BUILD_DIR="build-temp-$PLATFORM"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Determine which manifest to use and extract version
if [ "$PLATFORM" = "chrome" ]; then
    MANIFEST_FILE="manifest.json"
    if [ ! -f "$MANIFEST_FILE" ]; then
        print_error "manifest.json not found!"
        exit 1
    fi
else
    MANIFEST_FILE="manifest-firefox.json"
    if [ ! -f "$MANIFEST_FILE" ]; then
        print_error "manifest-firefox.json not found!"
        exit 1
    fi
fi

# Extract version from manifest file
# This handles both "version": "1.2.3" and "---version": "1.2.3" formats
VERSION=$(grep -E '"(---)?version"' "$MANIFEST_FILE" | head -1 | sed -E 's/.*"(---)?version"[[:space:]]*:[[:space:]]*"([^"]+)".*/\2/')

if [ -z "$VERSION" ] || [ "$VERSION" = "0.0.0" ]; then
    print_warning "Could not extract version or version is 0.0.0, using 'latest'"
    VERSION="latest"
fi

# =============================================================================
# DEBUG MODE SAFETY CHECK
# =============================================================================

print_header "Checking for debug mode"

# Check if debug mode is enabled in the manifest
DEBUG_MODE=$(grep -E '"debug"[[:space:]]*:[[:space:]]*true' "$MANIFEST_FILE" || echo "")

if [ -n "$DEBUG_MODE" ]; then
    echo ""
    echo "🚨 ============================================== 🚨"
    echo ""
    print_error "DEBUG MODE DETECTED!"
    echo ""
    print_info "The manifest file contains: \"debug\": true"
    print_info "This indicates the extension is in development mode."
    echo ""
    print_error "❌ Cannot build for store distribution while in debug mode!"
    echo ""
    print_info "To fix this:"
    print_info "1. Open: $MANIFEST_FILE"
    print_info "2. Change: \"debug\": true"
    print_info "3. To:     \"debug\": false"
    print_info "4. Save the file and run the build again"
    echo ""
    print_warning "This safety check prevents accidental submission of debug builds."
    echo ""
    echo "🚨 ============================================== 🚨"
    echo ""
    exit 1
fi

print_success "Debug mode check passed (debug: false or not present)"

ZIP_NAME="stash-$PLATFORM-v$VERSION.zip"

print_info "Manifest file: $MANIFEST_FILE"
print_info "Version: $VERSION"
print_info "Output: $ZIP_NAME"

# =============================================================================
# CLEANUP EXISTING BUILD
# =============================================================================

print_header "Cleaning up previous builds"

# Remove old build directory if it exists
if [ -d "$BUILD_DIR" ]; then
    print_info "Removing old build directory: $BUILD_DIR"
    rm -rf "$BUILD_DIR"
fi

# Remove old zip file if it exists
if [ -f "$ZIP_NAME" ]; then
    print_info "Removing old zip file: $ZIP_NAME"
    rm -f "$ZIP_NAME"
fi

print_success "Cleanup completed"

# =============================================================================
# CREATE BUILD DIRECTORY AND COPY FILES
# =============================================================================

print_header "Creating build directory and copying files"

# Create build directory
mkdir -p "$BUILD_DIR"
print_info "Created build directory: $BUILD_DIR"

# Files and directories to EXCLUDE from the build (blacklist approach)
# This is more future-proof - any new files you add will automatically be included
EXCLUDE_PATTERNS=(
    ".git"              # Git repository
    ".gitignore"        # Git ignore file
    "build-*.sh"        # All build scripts
    "build-store.sh"    # This build script
    "*.md"              # Markdown files (README, etc.)
    "LICENSE"           # License file
    ".DS_Store"         # macOS system files
    "manifest-*-backup.json"  # Backup manifest files
    "node_modules"      # Node modules if they exist
    "*.zip"             # Any existing zip files
    ".vscode"           # VS Code settings
    ".idea"             # IntelliJ settings
    "*.log"             # Log files
    "*.tmp"             # Temporary files
    "Thumbs.db"         # Windows thumbnail cache
)

# Copy all files using rsync with exclude patterns
print_info "Copying all files (using blacklist approach)..."

# Build rsync exclude arguments
RSYNC_EXCLUDES=""
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    RSYNC_EXCLUDES="$RSYNC_EXCLUDES --exclude=$pattern"
done

# Use rsync to copy files with excludes
# -a: archive mode (preserve permissions, timestamps, etc.)
# -v: verbose (but we'll capture output)
# --exclude: exclude patterns
if command -v rsync >/dev/null 2>&1; then
    print_info "Using rsync for efficient copying with excludes..."
    rsync -a $RSYNC_EXCLUDES ./ "$BUILD_DIR/" 2>/dev/null || {
        print_warning "rsync failed, falling back to cp method"
        # Fallback to cp method if rsync fails
        cp -r . "$BUILD_DIR/" 2>/dev/null
    }
else
    print_info "rsync not available, using cp method..."
    # Fallback method: copy everything then remove excluded files
    cp -r . "$BUILD_DIR/" 2>/dev/null
fi

print_success "Files copied to build directory"

# =============================================================================
# HANDLE MANIFEST FILE
# =============================================================================

print_header "Setting up manifest file for $PLATFORM"

if [ "$PLATFORM" = "chrome" ]; then
    # For Chrome, copy the existing manifest.json
    print_info "Copying Chrome manifest (manifest.json)"
    cp "$MANIFEST_FILE" "$BUILD_DIR/manifest.json"
else
    # For Firefox, copy manifest-firefox.json as manifest.json
    print_info "Copying Firefox manifest (manifest-firefox.json → manifest.json)"
    cp "$MANIFEST_FILE" "$BUILD_DIR/manifest.json"
fi

print_success "Manifest file configured for $PLATFORM"

# =============================================================================
# CLEAN UP UNWANTED FILES FROM BUILD
# =============================================================================

print_header "Removing unwanted files from build (cleanup after copy)"

# This cleanup is needed for the fallback cp method or if rsync missed anything
# Remove files and directories based on our exclude patterns

print_info "Performing thorough cleanup of excluded files..."

# Remove git-related files and directories
find "$BUILD_DIR" -name ".git" -type d -exec rm -rf {} + 2>/dev/null || true
find "$BUILD_DIR" -name ".gitignore" -type f -delete 2>/dev/null || true

# Remove build scripts
find "$BUILD_DIR" -name "build-*.sh" -type f -delete 2>/dev/null || true
find "$BUILD_DIR" -name "build-store.sh" -type f -delete 2>/dev/null || true

# Remove documentation and license files
find "$BUILD_DIR" -name "*.md" -type f -delete 2>/dev/null || true
find "$BUILD_DIR" -name "LICENSE" -type f -delete 2>/dev/null || true

# Remove system files
find "$BUILD_DIR" -name ".DS_Store" -type f -delete 2>/dev/null || true
find "$BUILD_DIR" -name "Thumbs.db" -type f -delete 2>/dev/null || true

# Remove backup manifest files
find "$BUILD_DIR" -name "manifest-*-backup.json" -type f -delete 2>/dev/null || true

# Remove temp directories and files (but not our current build directory)
# Note: We skip removing build-temp-* since we're currently using one
find "$BUILD_DIR" -name "*.tmp" -type f -delete 2>/dev/null || true
find "$BUILD_DIR" -name "*.log" -type f -delete 2>/dev/null || true

# Remove editor directories
find "$BUILD_DIR" -name ".vscode" -type d -exec rm -rf {} + 2>/dev/null || true
find "$BUILD_DIR" -name ".idea" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove node_modules if it exists
find "$BUILD_DIR" -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove any zip files that might have been copied
find "$BUILD_DIR" -name "*.zip" -type f -delete 2>/dev/null || true

# Remove this build script itself if it was copied
rm -f "$BUILD_DIR/build-store.sh" 2>/dev/null || true

print_success "Unwanted files removed"

# =============================================================================
# CREATE ZIP FILE
# =============================================================================

print_header "Creating zip file for $PLATFORM store"

# Change to build directory so zip doesn't include the build folder path
cd "$BUILD_DIR"

# Create zip file with all contents
# The -r flag makes it recursive, -q makes it quiet
print_info "Compressing files into $ZIP_NAME..."
zip -r -q "../$ZIP_NAME" .

# Change back to original directory
cd "$SCRIPT_DIR"

# Check if zip was created successfully
if [ ! -f "$ZIP_NAME" ]; then
    print_error "Failed to create zip file!"
    exit 1
fi

# Get zip file size for display
ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)

print_success "Zip file created: $ZIP_NAME ($ZIP_SIZE)"

# =============================================================================
# CLEANUP BUILD DIRECTORY
# =============================================================================

print_header "Cleaning up temporary files"

print_info "Removing build directory: $BUILD_DIR"
rm -rf "$BUILD_DIR"

print_success "Temporary files cleaned up"

# =============================================================================
# FINAL SUCCESS MESSAGE
# =============================================================================

echo ""
echo "🎉 ============================================== 🎉"
echo ""
print_success "BUILD COMPLETED SUCCESSFULLY!"
echo ""
print_info "Platform: $PLATFORM"
print_info "Version: $VERSION" 
print_info "Output file: $ZIP_NAME"
print_info "File size: $ZIP_SIZE"
echo ""
if [ "$PLATFORM" = "chrome" ]; then
    print_info "📦 Ready for Chrome Web Store submission"
    print_info "   Go to: https://chrome.google.com/webstore/developer/dashboard"
else
    print_info "🦊 Ready for Mozilla Add-ons submission"  
    print_info "   Go to: https://addons.mozilla.org/developers/"
fi
echo ""
echo "🎉 ============================================== 🎉" 