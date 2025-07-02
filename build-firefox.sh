#!/bin/bash

# Build script for Firefox extension
# Copies Firefox manifest to replace Chrome manifest

echo "🦊 Setting up Firefox build..."

# Check if Firefox manifest exists
if [ ! -f "__manifest-firefox.json" ]; then
    echo "❌ Error: __manifest-firefox.json not found!"
    exit 1
fi

# Backup current manifest if it's Chrome version
if [ -f "manifest.json" ] && grep -q "service_worker" manifest.json; then
    echo "💾 Backing up Chrome manifest..."
    cp manifest.json __manifest-chrome.json
fi

# Copy Firefox manifest
echo "📋 Copying Firefox manifest..."
cp __manifest-firefox.json manifest.json

# Verify the copy worked
if grep -q '"scripts"' manifest.json; then
    echo "✅ Firefox manifest is now active"
else
    echo "❌ Error: Firefox manifest copy failed"
    exit 1
fi

echo "✅ Firefox build ready!"
echo "📦 Load extension from this directory in Firefox"
echo "   about:debugging → This Firefox → Load Temporary Add-on"
echo ""
echo "⚠️  To switch back to Chrome, run: ./build-chrome.sh" 