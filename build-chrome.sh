#!/bin/bash

# Build script for Chrome extension
# Copies Chrome manifest to replace active manifest

echo "🔧 Setting up Chrome build..."

# Check if Chrome manifest exists
if [ ! -f "Manifest-chrome.json" ]; then
    echo "❌ Error: Manifest-chrome.json not found!"
    exit 1
fi

# Copy Chrome manifest
echo "📋 Copying Chrome manifest..."
cp Manifest-chrome.json manifest.json

# Verify the copy worked
if grep -q "service_worker" manifest.json; then
    echo "✅ Chrome manifest is now active"
else
    echo "❌ Error: Chrome manifest copy failed"
    exit 1
fi

echo "✅ Chrome build ready!"
echo "📦 Load extension from this directory in Chrome"
echo "   chrome://extensions/ → Load unpacked"
echo ""
echo "⚠️  To switch to Firefox, run: ./build-firefox.sh"
