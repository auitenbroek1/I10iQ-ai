#!/bin/bash

# STABLE BACKUP v2.1 RESTORATION SCRIPT
# Restores the website to the stable enhanced-interactions version
# Created: 2025-07-11

echo "🔄 Restoring i10iQ.AI to Stable Backup v2.1 (Enhanced Interactions)..."

# Check if backup exists
if [ ! -d "STABLE_BACKUP_v2.1_enhanced-interactions" ]; then
    echo "❌ Error: STABLE_BACKUP_v2.1_enhanced-interactions directory not found!"
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
cp -r STABLE_BACKUP_v2.1_enhanced-interactions/* frontend/

# Restore package.json and config files
cp STABLE_BACKUP_v2.1_enhanced-interactions/package.json frontend/
cp STABLE_BACKUP_v2.1_enhanced-interactions/tailwind.config.js frontend/
cp STABLE_BACKUP_v2.1_enhanced-interactions/craco.config.js frontend/

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
    echo "   vercel deploy --prod --yes"
    echo ""
    echo "📋 This restoration includes:"
    echo "   ✅ Enhanced service interactions (hover/scroll)"
    echo "   ✅ Consistent rounded button styling"
    echo "   ✅ Blurple color theme (#5c4bea)"
    echo "   ✅ Optimized content and copy"
    echo "   ✅ Mobile-responsive design"
    echo "   ✅ Performance optimizations"
    echo ""
    echo "🌐 Last known good deployment:"
    echo "   https://frontend-39233eeq0-aarons-projects-30c7e6bd.vercel.app"
    echo ""
    echo "📊 Features:"
    echo "   🖱️  Desktop: Hover to expand service cards"
    echo "   📱 Mobile: Scroll to activate cards automatically"
    echo "   🎨 Consistent: Rounded buttons throughout"
    echo "   ⚡ Fast: 121.13 kB gzipped, smooth animations"
else
    echo "❌ Build failed! Check the error messages above."
    exit 1
fi