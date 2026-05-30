# Upsolve

A modern web application for analyzing coding profiles, comparing progress with peers, and getting personalized problem recommendations.

## ✨ Features

- **Profile Analysis**: Deep insights into your coding performance
- **Peer Comparison**: Compare progress with other developers
- **Smart Recommendations**: Personalized problem suggestions
- **Progress Tracking**: Visual submission heatmaps and statistics
- **PDF Export**: Download your analysis reports
- **Responsive Design**: Works on all devices

## 🎨 Design

- Responsive design optimized for all screen sizes
- Modern glass morphism UI elements
- Accessibility-focused components

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern state management
- **Axios** - HTTP client for API calls
- **jsPDF** - PDF generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **JWT** - Authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/priyanshuraj27/Upsolve.git
   cd Upsolve
   ```

2. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with your API URLs
   npm run dev
   ```

3. **Setup Backend:**
   ```bash
   cd ../backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and secrets
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:10000

## 📦 Production Deployment

### Frontend (Vercel)

1. **Prepare Environment Variables:**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   NEXT_PUBLIC_ML_API_URL=https://ml-backend-leetcodehelper.onrender.com
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on every push to main

### Backend (Render)

1. **Prepare Environment Variables:**
   ```bash
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/UpsolveDB
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

2. **Deploy to Render:**
   - Create a new Web Service
   - Connect your GitHub repository
   - Set environment variables
   - Auto-deploy on every push to main

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_ML_API_URL=https://ml-backend-leetcodehelper.onrender.com
```

#### Backend (.env)
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/UpsolveDB
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=10d
CORS_ORIGIN=https://your-frontend-domain.vercel.app
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 📊 Features Overview

### 🔍 Profile Analysis
- Detailed statistics and metrics
- Submission history visualization
- Performance insights and trends
- Progress tracking over time

### 👥 Peer Comparison
- Side-by-side profile comparison
- Competitive analysis features
- Strengths and weaknesses identification
- Collaborative learning insights

### 🎯 Smart Recommendations
- Personalized problem suggestions
- Difficulty-based recommendations
- Topic-focused learning paths
- Performance-driven suggestions

### 📈 Progress Tracking
- Interactive submission heatmaps
- Historical data visualization
- Performance trend analysis
- Goal tracking and milestones

## 🎨 Color Palette

- **Primary**: #5BC8AF (Mint Green)
- **Secondary**: #5FB0B7 (Teal Blue)
- **Accent**: #6C91BF (Soft Blue)
- **Highlight**: #A14EBF (Purple)

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Enhanced experience on tablets
- **Desktop Optimized**: Full-featured desktop interface
- **Cross-Browser**: Compatible with all modern browsers

## 🚀 Performance Optimizations

- **Next.js Optimizations**: Automatic code splitting and optimization
- **Image Optimization**: WebP and AVIF format support
- **Bundle Optimization**: Tree shaking and minification
- **Caching Strategy**: Optimal caching for static assets
- **Loading States**: Smooth user experience with loading indicators

## 📖 API Documentation

### Endpoints

#### GET /api/profile/:username
Fetch coding profile data for a user.

#### GET /api/recommend/similar?username=:username
Get similar problem recommendations.

#### GET /api/recommend/diff?username=:username
Get challenging problem recommendations.

## 🛠️ Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Professional code structure

### Testing
- Error boundary implementation
- Input validation
- API error handling
- User feedback systems

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- LeetCode for providing the platform
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and users of this project

---
