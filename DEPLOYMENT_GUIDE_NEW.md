# i10iQ.AI Deployment Guide

## Current Stable Version: v2.0.0-blurple-final

**Live URL**: https://frontend-4fxkrilxx-aarons-projects-30c7e6bd.vercel.app
**Git Tag**: `v2.0.0-blurple-final`
**Created**: 2025-07-11

## Quick Deployment

### From Stable Backup
```bash
# Restore to stable version
./RESTORE_STABLE_BACKUP_v2.sh

# Deploy to production
cd frontend
vercel deploy --prod
```

### Manual Deployment
```bash
cd frontend
npm install
npm run build
vercel deploy --prod
```

## What's Included in Current Version

### ✅ Complete Blurple Rebrand
- Unified color scheme using #5c4bea (blurple)
- Consistent branding with "i10iQ.AI" 
- Updated fonts and visual hierarchy

### ✅ Enhanced Content Strategy
- **The AI Level-Up**: Educational guidance for AI newcomers
- **The AI-First Leader**: Advanced skills for competitive advantage  
- **AI Discovery Workshop**: Strategic roadmap development
- **AI Build Services**: Custom solutions and automation

### ✅ Technical Improvements
- Fixed mobile layout shifts
- Optimized image sizing and positioning
- Enhanced chat widget with updated branding
- Responsive design across all devices
- Smooth animations and interactions

### ✅ New Components
- `BrandLogo.js`: Consistent brand display
- `LearnMoreModal.js`: Detailed service information
- Enhanced `ContactForm.js` with phone field
- Updated `AIChatWidget.js` with new messaging

## File Structure
```
i10iQ-ai/
├── frontend/                    # Main application
├── STABLE_BACKUP_v2.0_blurple-final/  # Stable backup
├── RESTORE_STABLE_BACKUP_v2.sh # Quick restore script
├── DEPLOYMENT_GUIDE_NEW.md     # This file
└── README.md                   # Project overview
```

## Environment Requirements

### Node.js & Dependencies
- Node.js 18+ recommended
- React 19 with Create React App (CRACO)
- Tailwind CSS for styling
- Framer Motion for animations

### Deployment Platform
- **Primary**: Vercel (configured with vercel.json)
- **Domain**: Custom domain can be configured in Vercel dashboard
- **Build Command**: `npm run build`
- **Output Directory**: `build`

## Configuration Files

### Key Config Files
- `tailwind.config.js`: Color definitions and theme
- `craco.config.js`: Build configuration  
- `vercel.json`: Deployment settings
- `package.json`: Dependencies and scripts

### Color Variables
```css
--blurple: #5c4bea;  /* Primary brand color */
--primary: #2563eb;  /* Blue-600 */  
--secondary: #9333ea; /* Purple-600 */
--navy: #1f2640;     /* Dark backgrounds */
```

## Backup & Recovery

### Current Backup System
- **Stable Backup**: `STABLE_BACKUP_v2.0_blurple-final/`
- **Restore Script**: `RESTORE_STABLE_BACKUP_v2.sh`
- **Git Tags**: `v2.0.0-blurple-final`

### Creating New Backups
```bash
# Create backup of current state
cp -r frontend STABLE_BACKUP_v2.1_$(date +%Y%m%d)

# Commit and tag
git add .
git commit -m "New stable version"
git tag -a v2.1.0 -m "Description of changes"
```

## Development Workflow

### Making Changes
1. Start from stable backup or current frontend
2. Make incremental changes
3. Test thoroughly (mobile + desktop)
4. Build and deploy to test environment
5. Once stable, create new backup and tag

### Testing Checklist
- [ ] Hero animation works on mobile/desktop
- [ ] Services cards expand/collapse properly
- [ ] Contact form submits correctly
- [ ] Chat widget opens and functions
- [ ] All colors use blurple theme
- [ ] Images load and are properly sized
- [ ] No layout shifts on mobile
- [ ] All links and buttons work

## Troubleshooting

### Common Issues
1. **Build Fails**: Check node_modules, run `npm install`
2. **Colors Wrong**: Verify tailwind.config.js has blurple defined
3. **Mobile Layout**: Check AnimatedText.js for fixed heights
4. **Images Not Loading**: Verify Unsplash URLs in App.js

### Reset to Stable Version
```bash
./RESTORE_STABLE_BACKUP_v2.sh
```

## Contact & Support
- **Primary Contact**: Aaron Uitenbroek (auitenbroek@gmail.com)
- **Project Repo**: Local development environment
- **Deployment Platform**: Vercel
- **Latest Deployment**: https://frontend-4fxkrilxx-aarons-projects-30c7e6bd.vercel.app

---
**Last Updated**: 2025-07-11
**Version**: v2.0.0-blurple-final