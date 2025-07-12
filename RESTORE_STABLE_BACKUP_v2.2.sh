#!/bin/bash

# STABLE BACKUP v2.2 RESTORATION SCRIPT
# Restores the website to the custom domain deployed version
# Created: 2025-07-12

echo "🔄 Restoring i10iQ.AI to Stable Backup v2.2 (Custom Domain Deployed)..."

# Check if backup exists
if [ ! -d "STABLE_BACKUP_v2.2_custom-domain-deployed" ]; then
    echo "❌ Error: STABLE_BACKUP_v2.2_custom-domain-deployed directory not found!"
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
cp -r STABLE_BACKUP_v2.2_custom-domain-deployed/* frontend/

# Restore package.json and config files
cp STABLE_BACKUP_v2.2_custom-domain-deployed/package.json frontend/
cp STABLE_BACKUP_v2.2_custom-domain-deployed/tailwind.config.js frontend/
cp STABLE_BACKUP_v2.2_custom-domain-deployed/craco.config.js frontend/

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
    echo "   ✅ Full custom domain deployment (i10iq.ai)"
    echo "   ✅ Railway backend integration"
    echo "   ✅ Updated service dropdown options"
    echo "   ✅ Blurple color theme (#5c4bea)"
    echo "   ✅ Enhanced service interactions"
    echo "   ✅ Mobile-responsive design"
    echo ""
    echo "🌐 Live URLs:"
    echo "   Frontend: https://i10iq.ai"
    echo "   Backend:  https://i10iq-ai-production.up.railway.app"
    echo ""
    echo "⚠️  Known Issue:"
    echo "   Contact form shows '500 Internal Server Error'"
    echo "   Backend and database are configured but connection needs debugging"
    echo ""
    echo "📊 Current Status:"
    echo "   🌐 Custom domain: WORKING"
    echo "   🎨 UI/UX: COMPLETE"
    echo "   🔧 Backend API: DEPLOYED"
    echo "   💾 Database: CONFIGURED"
    echo "   📧 Contact form: NEEDS DEBUG"
else
    echo "❌ Build failed! Check the error messages above."
    exit 1
fi