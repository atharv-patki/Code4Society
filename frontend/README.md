# Frontend - React + Vite

Carbon Footprint Calculator frontend built with React and Vite.

## Setup

### Requirements
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

Output: `dist/` folder

### Preview Build

```bash
npm run preview
```

## Configuration

Create `.env.local`:

```
VITE_API_URL=http://localhost:8000
```

Or copy template:
```bash
cp .env.example .env.local
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── CarbonScoreCard.jsx
│   ├── EmissionChart.jsx
│   ├── ErrorBoundary.jsx
│   ├── InputForm.jsx
│   ├── Navbar.jsx
│   ├── OffsetCard.jsx
│   ├── RecommendationList.jsx
│   └── WhatIfSimulator.jsx
├── pages/                # Page components
│   ├── Dashboard.jsx
│   └── Home.jsx
├── context/              # React Context
│   └── CarbonContext.jsx
├── services/             # API communication
│   └── api.js
├── utils/                # Utility functions
│   └── helpers.js
├── App.jsx               # Main app component
├── main.jsx              # React entry point
└── styles.css            # Global styles
```

## Features

- Calculate carbon footprint from lifestyle inputs
- View emissions breakdown with charts
- Get personalized AI recommendations
- Simulate carbon reduction scenarios
- View calculation history
- Responsive design
- Graceful fallback to mock data if backend unavailable

## Dependencies

- **react**: ^18.2.0 - UI library
- **react-dom**: ^18.2.0 - ReactDOM
- **react-router-dom**: ^7.13.1 - Routing
- **axios**: ^1.6.0 - HTTP client
- **recharts**: ^2.8.0 - Charts

## API Communication

The app communicates with the FastAPI backend at `VITE_API_URL`.

### Fallback to Mock

If no backend URL is configured or the backend is unreachable, the app falls back to mock calculations using functions in `src/utils/helpers.js`.

## Component Overview

### Pages
- **Home**: Main page with input form and results
- **Dashboard**: Shows calculation history

### Components
- **InputForm**: Collects user lifestyle data
- **CarbonScoreCard**: Displays total CO2 and score
- **EmissionChart**: Pie chart of emissions breakdown
- **OffsetCard**: Shows trees needed to offset
- **RecommendationList**: AI recommendations
- **WhatIfSimulator**: Scenario simulator with slider
- **Navbar**: Navigation between pages
- **ErrorBoundary**: Error handling wrapper

### Context
- **CarbonContext**: Manages results and history state

## Troubleshooting

### Port Already in Use
Edit `vite.config.js`:
```javascript
server: {
  port: 5174,  // Change this
}
```

### API Connection Issues
1. Check `VITE_API_URL` in `.env.local`
2. Verify backend is running
3. Check browser console for CORS errors

### Build Errors
```bash
rm -rf node_modules dist
npm install
npm run build
```

## Production Build

```bash
VITE_API_URL=https://api.yourdomain.com npm run build
```

The `dist/` folder contains static files ready to deploy.

## Deployment Options

- **Vercel**: Zero-config deployment
- **Netlify**: Drag & drop or GitHub integration
- **Firebase Hosting**: `firebase deploy`
- **AWS S3 + CloudFront**: Static site hosting
- **Docker**: Containerize with Nginx

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
