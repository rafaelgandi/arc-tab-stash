# 📦 Stash Extension Build Instructions

This guide explains how to use the `build-store.sh` script to package your Stash extension for submission to Chrome Web Store and Mozilla Add-ons Store.

## 🚀 Quick Start

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

### 1. Make the Script Executable (First Time Only)

```bash
chmod +x build-store.sh
```

### 2. Build for Chrome Web Store

```bash
./build-store.sh chrome
```

**What happens:**
- Uses `manifest.json` as the manifest file
- Extracts version from `manifest.json`
- Creates `stash-chrome-v{version}.zip`

### 3. Build for Mozilla Add-ons Store

```bash
./build-store.sh firefox
```

**What happens:**
- Uses `manifest-firefox.json` as the source manifest
- Copies `manifest-firefox.json` → `manifest.json` in the build
- Extracts version from `manifest-firefox.json`
- Creates `stash-firefox-v{version}.zip`

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

- **Chrome**: Reads version from `manifest.json`
- **Firefox**: Reads version from `manifest-firefox.json`

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
- Verify the manifest files exist in the current directory

**Error: "Could not extract version"**
- Check that your manifest file has a valid `version` field
- The script will use "latest" as fallback if version can't be detected

**Error: "DEBUG MODE DETECTED!"**
```
🚨 ==============================================  🚨

❌ DEBUG MODE DETECTED!

   The manifest file contains: "debug": true
   This indicates the extension is in development mode.

❌ Cannot build for store distribution while in debug mode!

   To fix this:
   1. Open: manifest.json (or manifest-firefox.json)
   2. Change: "debug": true  
   3. To:     "debug": false
   4. Save the file and run the build again

⚠️  This safety check prevents accidental submission of debug builds.

🚨 ==============================================  🚨
```
- This is a safety feature to prevent shipping debug builds to production
- Simply change `"debug": true` to `"debug": false` in your manifest file
- Make sure to update both manifest files if you're building for both platforms

**Permission denied**
```bash
chmod +x build-store.sh
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
3. **Disable debug mode** - The script will prevent builds if `"debug": true` is found in your manifest files (safety feature)
4. **Test locally first** - Load the unpacked extension locally before submitting to stores
5. **Keep builds organized** - The script names files with versions, so you can keep multiple builds
6. **Future-proof design** - The blacklist approach means any new files you add (new components, utilities, assets) will automatically be included in builds without updating the script
7. **Add to blacklist if needed** - If you add development files that shouldn't be included (like test files), just add them to the `EXCLUDE_PATTERNS` array in the script

## 🔄 Development Workflow

```bash
# 1. Update your code
# 2. Update version in manifest files  
# 3. Set debug mode to false in manifest files
# 4. Build for both platforms
./build-store.sh chrome
./build-store.sh firefox

# 5. Test the zip files locally (optional)
# 6. Submit to stores
```

### 🔍 Pre-Build Checklist:
- ✅ Code changes completed
- ✅ Version numbers updated in both manifest files
- ✅ **`"debug": false`** set in both manifest files
- ✅ Extension tested locally

---

**Need help?** Check the script's built-in help:
```bash
./build-store.sh
``` 