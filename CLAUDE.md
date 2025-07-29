# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build

### Testing Subdomains Locally
- Main site: `http://localhost:3000`
- Choreo app: `http://localhost:3000?subdomain=choreo`
- Admin app: `http://localhost:3000?subdomain=admin`

## Architecture Overview

This is a React + Vite application with a sophisticated subdomain-based architecture supporting multiple applications:

### Subdomain Architecture
- **Main Website** (`revolvo.tech`): Primary marketing site with 3D features, portfolio, and services
- **Choreo App** (`choreo.revolvo.tech`): Separate application with its own authentication and routing
- **Admin Portal** (`admin.revolvo.tech`): Future admin interface (placeholder implementation)

### Key Architecture Components

1. **Subdomain Detection** (`src/utils/subdomainDetection.js`): 
   - Automatically detects current subdomain and routes to appropriate app
   - Handles development mode with query parameters
   - Production mode uses actual subdomains

2. **App Router** (`src/App.jsx`):
   - Main entry point that switches between apps based on subdomain
   - Handles font loading per subdomain (Montserrat for main, Figtree/Poppins for Choreo)
   - Mobile detection and routing

3. **Choreo App** (`src/choreo/`):
   - Complete separate React application with own routing
   - Authentication system with context providers
   - Dedicated components, pages, and utilities

### Technology Stack
- **React 18** with hooks and context
- **Vite** for build tooling and development
- **React Router** for routing
- **Styled Components** for styling
- **Three.js** ecosystem (@react-three/fiber/drei) for 3D graphics
- **Framer Motion** for animations
- **Face API** for computer vision features
- **Wavesurfer.js** for audio visualization

### Project Structure Highlights
- `src/Components/` - Main website components
- `src/choreo/` - Complete Choreo application
- `src/pages/` - Main website pages
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions including subdomain detection
- `src/themes.jsx` - Theme configuration

### Development Configuration
- **Vite Config**: Custom CSP headers, subdomain proxy setup, optimized build output
- **ESLint**: Modern flat config with React rules
- **Port 3000**: Default development server
- **Terser**: Minification with console removal in production

### Mobile Experience
The application automatically detects mobile devices and renders a dedicated mobile app component (`src/Components/MobileApp.jsx`) instead of the desktop experience.

### Special Features
- **Loading States**: Custom skeleton loaders with route-specific messages
- **3D Models**: WebGL-based 3D rendering for interactive elements
- **Audio Processing**: Music visualization and audio analysis
- **Computer Vision**: Face detection capabilities
- **SEO Optimization**: React Helmet for meta tags and social sharing

### Build Output
- Optimized asset organization in `dist/`
- Chunked JavaScript and CSS files
- Image optimization and proper caching headers
- Source maps disabled for production