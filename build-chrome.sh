#!/bin/bash

# Build script for Chrome extension
# Ensures Chrome manifest is active

echo "🔧 Setting up Chrome build..."

# If there's a backup Chrome manifest, restore it
if [ -f "__manifest-chrome.json" ]; then
    echo "📋 Restoring Chrome manifest from backup..."
    cp __manifest-chrome.json manifest.json
    echo "✅ Chrome manifest restored"
elif [ -f "manifest.json" ] && grep -q "service_worker" manifest.json; then
    echo "✅ Chrome manifest is already active"
elif [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found!"
    exit 1
else
    echo "❌ Error: manifest.json doesn't appear to be Chrome version"
    echo "   Expected to find 'service_worker' in background section"
    echo "   Run ./build-firefox.sh first if you want to switch to Firefox"
    exit 1
fi

echo "✅ Chrome build ready!"
echo "📦 Load extension from this directory in Chrome"
echo "   chrome://extensions/ → Load unpacked" 