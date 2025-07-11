#!/bin/bash

# STABLE BACKUP v2.0 RESTORATION SCRIPT
# Restores the website to the stable blurple-final version
# Created: 2025-07-11

echo "🔄 Restoring i10iQ.AI to Stable Backup v2.0 (Blurple Final)..."

# Check if backup exists
if [ ! -d "STABLE_BACKUP_v2.0_blurple-final" ]; then
    echo "❌ Error: STABLE_BACKUP_v2.0_blurple-final directory not found!"
    echo "Please ensure you're running this from the project root directory."
    exit 1
fi

# Backup current state before restore (just in case)
echo "📦 Creating backup of current state..."
if [ -d "frontend" ]; then
    timestamp=$(date +"%Y%m%d_%H%M%S")
    cp -r frontend "TEMP_BACKUP_before_restore_$timestamp"
    echo "✅ Current state backed up to: TEMP_BACKUP_before_restore_$timestamp"
fi

# Restore from stable backup
echo "🔄 Restoring files from stable backup..."
rm -rf frontend/src frontend/public frontend/build
cp -r STABLE_BACKUP_v2.0_blurple-final/* frontend/

# Restore package.json and config files
cp STABLE_BACKUP_v2.0_blurple-final/package.json frontend/
cp STABLE_BACKUP_v2.0_blurple-final/tailwind.config.js frontend/
cp STABLE_BACKUP_v2.0_blurple-final/craco.config.js frontend/

cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 To deploy to production, run:"
    echo "   vercel deploy --prod"
    echo ""
    echo "📋 This restoration includes:"
    echo "   ✅ Blurple color theme (#5c4bea)"
    echo "   ✅ Updated services content"
    echo "   ✅ Fixed mobile layout issues"
    echo "   ✅ Optimized images and animations"
    echo "   ✅ Enhanced chat widget and forms"
    echo ""
    echo "🌐 Last known good deployment:"
    echo "   https://frontend-4fxkrilxx-aarons-projects-30c7e6bd.vercel.app"
else
    echo "❌ Build failed! Check the error messages above."
    exit 1
fi