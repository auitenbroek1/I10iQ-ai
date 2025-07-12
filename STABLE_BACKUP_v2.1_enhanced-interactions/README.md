# i10iQ.ai Landing Page

A premium, conversion-focused landing page for i10iQ.ai - an AI consultancy that cuts through the hype and delivers measurable business results.

## Features

- **Premium Design**: Professional UI with Navy (#1f2640), Blue (#2563eb), and Purple (#9333ea) brand colors
- **Interactive Elements**: Expandable service cards, hover effects, and smooth animations
- **AI Chat Widget**: Ready-to-integrate chat interface for AI chatbot connection
- **Responsive Design**: Optimized for all devices and screen sizes
- **SEO Optimized**: Structured data, meta tags, and performance optimized
- **Conversion Focused**: Strategic layout designed to drive user engagement

## Project Structure

```
i10iQ-ai/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO robots file
│   └── favicon.ico         # Site icon
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Component styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── craco.config.js         # CRACO configuration
└── vercel.json             # Vercel deployment configuration
```

## Installation & Development

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: Ensure all files are committed and pushed to your GitHub repository
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
3. **Configure Settings**:
   - Framework Preset: Create React App
   - Build Command: `yarn build`
   - Output Directory: `build`
   - Install Command: `yarn install`
4. **Deploy**: Click "Deploy" and your site will be live in minutes

### Deploy to Netlify

1. **Build the project**:
   ```bash
   yarn build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect your GitHub repository

### Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   yarn add --dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/i10iQ-ai",
     "scripts": {
       "predeploy": "yarn build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   yarn deploy
   ```

## Technologies Used

- **React 19**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework
- **CRACO**: Create React App Configuration Override
- **PostCSS**: CSS processing
- **Responsive Design**: Mobile-first approach

## Features Breakdown

### Hero Section
- Full-screen immersive design
- Professional imagery
- Clear value proposition
- Dual call-to-action buttons

### Services Section
- Interactive expandable cards
- 4 service offerings:
  - Education & Presentation
  - Hands-On Implementation
  - Discovery Workshops
  - Build Services

### About Section
- Founder credibility
- Key differentiators
- Professional imagery
- Experience highlights

### Chat Widget
- Floating chat interface
- Professional branding
- Ready for AI integration
- Responsive design

### Social Proof
- Client testimonials
- 5-star ratings
- Success stories

## Brand Guidelines

- **Primary Colors**: Navy (#1f2640), Blue (#2563eb), Purple (#9333ea)
- **Gradients**: Blue-to-Purple gradient for interactive elements
- **Typography**: Professional system fonts
- **Tone**: Trusted expert, anti-hype, results-focused
- **Messaging**: "Cut through the AI hype, deliver measurable results"

## AI Chat Integration

The chat widget is ready for AI chatbot integration. To connect:

1. Add your AI service API endpoint
2. Update the chat functionality in `App.js`
3. Implement message handling and responses
4. Add authentication if required

## SEO Optimization

- Meta tags for social media sharing
- Structured data for search engines
- Optimized page titles and descriptions
- Sitemap and robots.txt included

## Performance

- Optimized images
- Lazy loading
- Minimized bundle size
- Fast loading times
- Responsive design

## Contact

For questions about this landing page:
- Email: aaron@i10iq.com
- LinkedIn: https://www.linkedin.com/in/aaroni10/
- Website: https://i10iq.com

## License

This project is proprietary to i10iQ.ai.

---

*Built with precision for maximum conversion and professional impact.*