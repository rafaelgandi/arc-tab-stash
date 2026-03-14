# 📦 Stash Extension Build Instructions

This guide explains how to use the `build-store.sh` script to package your Stash extension for submission to Chrome Web Store and Mozilla Add-ons Store.

## 🚀 Quick Start

### Local Development (load unpacked)
```bash
# Switch to Chrome manifest (for chrome://extensions → Load unpacked)
./build-chrome.sh

# Switch to Firefox manifest (for about:debugging → Load Temporary Add-on)
./build-firefox.sh
```

### Store Submission
```bash
# Build for Chrome Web Store
./build-store.sh chrome

# Build for Mozilla Add-ons Store
./build-store.sh firefox
```

## 📋 Prerequisites

- **Operating System**: macOS, Linux, or Windows with WSL
- **Required Tools**: `bash`, `zip` command
- **File Structure**: Ensure your extension files are properly organized in the project root

## 🔧 How to Use

### 1. Make Scripts Executable (First Time Only)

```bash
chmod +x build-chrome.sh build-firefox.sh build-store.sh
```

### 2. Switch Manifest for Local Development

Each platform has a dedicated source manifest (`Manifest-chrome.json` / `Manifest-firefox.json`). Before loading the unpacked extension in a browser, run the appropriate script to copy the correct manifest into `manifest.json`:

```bash
# Activate Chrome manifest
./build-chrome.sh

# Activate Firefox manifest
./build-firefox.sh
```

Both scripts follow the same pattern:
- Copy the platform-specific source manifest → `manifest.json`
- Verify the copy succeeded
- `manifest.json` will always have `"debug": true` since it is baked into both `Manifest-chrome.json` and `Manifest-firefox.json`

### 3. Build for Chrome Web Store

```bash
./build-store.sh chrome
```

**What happens:**
- Reads version and manifest from `Manifest-chrome.json`
- Detects `"debug": true` and automatically strips it from both the build copy and the root `manifest.json`
- Creates `stash-chrome-v{version}.zip` with no debug flag

### 4. Build for Mozilla Add-ons Store

```bash
./build-store.sh firefox
```

**What happens:**
- Reads version and manifest from `Manifest-firefox.json`
- Detects `"debug": true` and automatically strips it from both the build copy and the root `manifest.json`
- Creates `stash-firefox-v{version}.zip` with no debug flag

## 📁 What Gets Included in the Build

### ✅ **Blacklist Approach - Future-Proof!**
The script uses a **blacklist approach**, meaning it copies **ALL** files from your project directory EXCEPT those explicitly excluded. This ensures any new files you add to your extension will automatically be included in future builds without needing to update the script.

### ✅ **What Gets Included (Everything Except Excludes):**
- All your extension source files (JS, HTML, CSS)
- All directories and subdirectories you create
- Any new components, hooks, utilities, or assets you add
- Platform-appropriate `manifest.json` file
- **Any future files you add will be automatically included!**

### ❌ **Excluded Files and Directories (Blacklist):**
- **Git & Version Control:**
  - `.git/` directory and `.gitignore` files
- **Build & Development Files:**
  - `build-*.sh` scripts (including the build-store.sh script)
  - `build-temp-*` temporary build directories
  - `*.zip` files (previous builds)
- **Documentation:**
  - `*.md` files (README.md, BUILD_INSTRUCTIONS.md, etc.)
  - `LICENSE` file
- **System Files:**
  - `.DS_Store` files (macOS)
  - `Thumbs.db` files (Windows)
- **Editor/IDE Files:**
  - `.vscode/` directory
  - `.idea/` directory  
- **Dependencies:**
  - `node_modules/` directory (if present)
- **Temporary Files:**
  - `*.tmp` files
  - `*.log` files
  - `manifest-*-backup.json` backup files

## 📊 Example Output

### Successful Chrome Build:
```
🔧 Setting up build for chrome
   Manifest file: manifest.json
   Version: 1.5.3
   Output: stash-chrome-v1.5.3.zip

🔧 Checking for debug mode
✅ Debug mode check passed (debug: false or not present)

🔧 Cleaning up previous builds
✅ Cleanup completed

🔧 Creating build directory and copying files
   Created build directory: build-temp-chrome
   Copying all files (using blacklist approach)...
   Using rsync for efficient copying with excludes...
✅ Files copied to build directory

🔧 Setting up manifest file for chrome
   Copying Chrome manifest (manifest.json)
✅ Manifest file configured for chrome

🔧 Removing unwanted files from build (cleanup after copy)
   Performing thorough cleanup of excluded files...
✅ Unwanted files removed

🔧 Creating zip file for chrome store
   Compressing files into stash-chrome-v1.5.3.zip...
✅ Zip file created: stash-chrome-v1.5.3.zip (2.1M)

🔧 Cleaning up temporary files
✅ Temporary files cleaned up

🎉 ==============================================  🎉

✅ BUILD COMPLETED SUCCESSFULLY!

   Platform: chrome
   Version: 1.5.3
   Output file: stash-chrome-v1.5.3.zip
   File size: 2.1M

   📦 Ready for Chrome Web Store submission
   Go to: https://chrome.google.com/webstore/developer/dashboard

🎉 ==============================================  🎉
```

## 🔍 Version Detection

The script automatically detects the version from your manifest files:

- **Chrome**: Reads version from `Manifest-chrome.json`
- **Firefox**: Reads version from `Manifest-firefox.json`

It handles both standard version format and the custom `---version` format:
```json
{
  "version": "1.5.3"
}
```
or
```json
{
  "---version": "1.5.3",
  "version": "0.0.0"
}
```

## 🏪 Store Submission

### Chrome Web Store
1. Run `./build-store.sh chrome`
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
3. Upload `stash-chrome-v{version}.zip`

### Mozilla Add-ons Store
1. Run `./build-store.sh firefox`
2. Go to [Mozilla Add-ons Developer Hub](https://addons.mozilla.org/developers/)
3. Upload `stash-firefox-v{version}.zip`

## 🛠 Troubleshooting

### Common Issues:

**Error: "No platform specified!"**
```bash
# ❌ Wrong
./build-store.sh

# ✅ Correct
./build-store.sh chrome
```

**Error: "manifest.json not found!" or "manifest-firefox.json not found!"**
- Ensure you're running the script from the project root directory
- For Chrome: run `./build-chrome.sh` first to generate `manifest.json` from `Manifest-chrome.json`
- For Firefox: verify `Manifest-firefox.json` exists in the current directory

**Error: "Could not extract version"**
- Check that your manifest file has a valid `version` field
- The script will use "latest" as fallback if version can't be detected

**Warning: "Debug mode detected"**
- `"debug": true` is permanently baked into `Manifest-chrome.json` and `Manifest-firefox.json` for development convenience
- `build-store.sh` will automatically detect and strip `"debug": true` from both the packaged zip and the root `manifest.json` — no manual action needed

**Permission denied**
```bash
chmod +x build-chrome.sh build-firefox.sh build-store.sh
```

### Script won't run?
Make sure you have the required tools:
```bash
# Check if zip is available
which zip

# Check if bash is available  
which bash
```

## 🧹 Cleanup

The script automatically:
- Removes temporary build directories
- Cleans up old zip files with the same name
- Removes system files like `.DS_Store`

No manual cleanup is needed!

## 💡 Tips

1. **Always run from project root** - The script expects to find manifest files in the current directory
2. **Check version numbers** - Make sure your manifest versions are updated before building
3. **Debug mode is automatic** - `"debug": true` is always present during development and is automatically stripped by `build-store.sh` before packaging
4. **Test locally first** - Load the unpacked extension locally before submitting to stores
5. **Keep builds organized** - The script names files with versions, so you can keep multiple builds
6. **Future-proof design** - The blacklist approach means any new files you add (new components, utilities, assets) will automatically be included in builds without updating the script
7. **Add to blacklist if needed** - If you add development files that shouldn't be included (like test files), just add them to the `EXCLUDE_PATTERNS` array in the script

## 🔄 Development Workflow

### Local testing
```bash
# Load in Chrome (unpacked)
./build-chrome.sh
# → chrome://extensions/ → Load unpacked

# Load in Firefox (temporary add-on)
./build-firefox.sh
# → about:debugging → This Firefox → Load Temporary Add-on
```

### Store submission
```bash
# 1. Update your code
# 2. Update version in Manifest-chrome.json and Manifest-firefox.json
# 3. Build for both platforms (debug flag is stripped automatically)
./build-store.sh chrome
./build-store.sh firefox
# 4. Test the zip files locally (optional)
# 5. Submit to stores
```

### 🔍 Pre-Build Checklist:
- ✅ Code changes completed
- ✅ Version numbers updated in `Manifest-chrome.json` and `Manifest-firefox.json`
- ✅ Extension tested locally
- ✅ `build-store.sh` will handle stripping `"debug": true` automatically

---

**Need help?** Check the script's built-in help:
```bash
./build-store.sh
``` 