# Testing Guide for Browser API Abstraction

## ✅ Changes Made
1. Created `lib/browser-api.js` - Browser API abstraction layer
2. Updated all files to use abstracted APIs instead of direct `chrome.*` calls
3. Fixed duplicate version field in `manifest.json`
4. Improved promise/callback detection logic

## 🧪 How to Test

### 1. Chrome Testing (Current Platform)

**Load Extension in Chrome:**
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select this project folder

**Test Core Functionality:**
- [ ] Extension loads without errors (check console in extension details)
- [ ] Popup opens when clicking extension icon
- [ ] Can add current tab to stash (Alt+Shift+S or button)
- [ ] Can open stash popup (Alt+Shift+O)
- [ ] Settings modal works (GitHub token input)
- [ ] Storage persists between sessions
- [ ] Content script shows toast notifications

**Check Console for Errors:**
1. Right-click extension icon → "Inspect popup" → Check Console tab
2. Go to `chrome://extensions/` → Click "service worker" link → Check Console
3. Open any webpage → F12 → Console → Look for extension errors

### 2. Expected Console Output
When working correctly, you should see:
```
Browser API abstraction loaded successfully
No chrome.* API calls should be visible
```

### 3. Key Things to Verify

**✅ What Should Work:**
- All existing functionality preserved
- No JavaScript errors in console
- Extension loads and runs normally
- Storage operations work
- Tab operations work
- Keyboard shortcuts work

**❌ What Would Indicate Problems:**
- Console errors mentioning "chrome is not defined"
- Extension fails to load
- Popup doesn't open
- Storage doesn't persist
- API calls fail silently

### 4. Debug Information

**If issues occur, check:**
1. **Browser Console** (F12 → Console)
2. **Extension Console** (chrome://extensions → service worker)
3. **Popup Console** (Right-click extension → Inspect popup)

**Common Issues & Solutions:**
- **"chrome is not defined"**: Browser API abstraction not working
- **"Cannot read property of undefined"**: API detection logic issue
- **Extension won't load**: Manifest or syntax error
- **Functions not working**: Promise/callback handling issue

### 5. Testing Checklist

**Basic Functionality:**
- [ ] Extension loads in Chrome
- [ ] No console errors
- [ ] Popup opens and displays
- [ ] Can add tabs to stash
- [ ] Settings modal opens
- [ ] Keyboard shortcuts work
- [ ] Storage persists

**API Abstraction:**
- [ ] No direct `chrome.*` calls in code
- [ ] Browser detection works
- [ ] Promise handling works
- [ ] Error handling works

## 🔧 If Problems Found

1. **Check Console**: Look for specific error messages
2. **Verify Imports**: Ensure all files import browser-api correctly
3. **Test API Detection**: Check if `browserInfo.isChrome` returns true
4. **Validate Manifest**: Ensure no JSON syntax errors

## 📝 Report Results

Please test and report:
1. ✅ **Success**: "All tests passed, ready for Firefox manifest"
2. ❌ **Issues Found**: Specific error messages and which functionality failed

## 🦊 Firefox Testing (Phase 3 Complete!)

### 1. Firefox Testing Setup

**Switch to Firefox Build:**
```bash
./build-firefox.sh
```

**Load Extension in Firefox:**
1. Open Firefox Developer Edition (recommended) or regular Firefox
2. Go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select `manifest.json` from this project folder

**Test Core Functionality:**
- [ ] Extension loads without errors
- [ ] Popup opens when clicking extension icon
- [ ] Can add current tab to stash (Alt+Shift+S or button)
- [ ] Can open stash popup (Alt+Shift+O)
- [ ] Settings modal works (GitHub token input)
- [ ] Storage persists between sessions
- [ ] Content script shows toast notifications

**Switch Back to Chrome:**
```bash
./build-chrome.sh
```

### 2. Cross-Browser Testing

**Test Both Platforms:**
1. Test in Chrome (default state)
2. Run `./build-firefox.sh` and test in Firefox
3. Run `./build-chrome.sh` to return to Chrome development

**Key Differences to Note:**
- Firefox: Uses `background.scripts` (traditional background script)
- Chrome: Uses `background.service_worker` (MV3 service worker)
- Both: Should have identical functionality through browser API abstraction

### 3. Build Scripts

**Available Commands:**
- `./build-chrome.sh` - Set up for Chrome development/testing
- `./build-firefox.sh` - Set up for Firefox development/testing

**What the Scripts Do:**
- Automatically backup and restore appropriate manifests
- Validate manifest format for target browser
- Provide clear instructions for loading extension

Once both Chrome and Firefox testing passes, the cross-browser compatibility is complete! 🎉 