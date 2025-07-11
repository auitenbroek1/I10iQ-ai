#!/bin/bash

# Restore Script for i10iQ Stable Backup v1.0
# Run this script from the I10iQ-ai directory

echo "🔄 Restoring i10iQ to stable backup v1.0 (blue-purple color scheme)..."

# Check if we're in the right directory
if [ ! -d "STABLE_BACKUP_v1.0_blue-purple" ]; then
    echo "❌ Error: STABLE_BACKUP_v1.0_blue-purple directory not found!"
    echo "   Make sure you're running this from the I10iQ-ai directory"
    exit 1
fi

# Backup current state (just in case)
if [ -d "frontend" ]; then
    echo "📦 Backing up current frontend to frontend_before_restore..."
    cp -r frontend frontend_before_restore
fi

# Remove current frontend
echo "🗑️  Removing current frontend..."
rm -rf frontend

# Restore from backup
echo "📂 Restoring from backup..."
cp -r STABLE_BACKUP_v1.0_blue-purple frontend

# Go into frontend directory
cd frontend

# Reinstall dependencies
echo "📥 Installing dependencies..."
npm install

echo "✅ Restore complete!"
echo ""
echo "🚀 To test locally:"
echo "   cd frontend && npm start"
echo ""
echo "🌐 To deploy:"
echo "   cd frontend && npm run build && vercel --prod"
echo ""
echo "📍 This backup includes:"
echo "   - No layout shifting issues"
echo "   - Mobile text alignment fixed"
echo "   - Blue-purple color scheme"
echo "   - All original messaging"
echo "   - Production-ready state"