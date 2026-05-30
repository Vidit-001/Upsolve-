# Upsolve Backend

A TypeScript/Express.js backend service for analyzing coding profiles and providing question recommendations.

## 🚀 Features

- **Profile Analysis**: Fetch and analyze coding user profiles
- **Problem Recommendations**: Suggest similar or new problems based on user activity
- **Statistics Tracking**: Detailed submission statistics and progress tracking
- **CORS Support**: Configured for frontend integration
- **Health Monitoring**: Built-in health check endpoint

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (optional for user data)
- **Authentication**: JWT tokens
- **API Integration**: Coding platform GraphQL APIs

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database (optional)
- LeetCode API access

## 🔧 Local Development

### 1. Clone and Install

```bash
git clone <repository-url>
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```bash
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration (optional)
MONGODB_URI=mongodb://localhost:27017/leetcode-helper

# JWT Configuration
JWT_SECRET=your-development-jwt-secret
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=10d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Start Development Server

```bash
# Build and start
npm run dev

# Or with watch mode
npm run dev:watch
```

The server will start on `http://localhost:5000`

## 🌐 Production Deployment on Render

### 1. Prepare for Deployment

The repository includes a `render.yaml` file for automatic deployment configuration.

### 2. Environment Variables on Render

Set the following environment variables in your Render dashboard:

**Required:**
- `NODE_ENV=production`
- `PORT=10000` (Render default)
- `MONGODB_URI=<your-mongodb-connection-string>`
- `JWT_SECRET=<your-production-jwt-secret>`
- `ACCESS_TOKEN_SECRET=<your-access-token-secret>`
- `REFRESH_TOKEN_SECRET=<your-refresh-token-secret>`

**Optional:**
- `CORS_ORIGIN=http://localhost:3000` (for development)
- `FRONTEND_URL=https://your-frontend-domain.vercel.app` (for production)

### 3. Deploy Steps

1. **Connect Repository**: Link your GitHub repository to Render
2. **Create Web Service**: Choose "Web Service" and select your repository
3. **Configure Build**: 
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. **Set Environment Variables**: Add all required environment variables
5. **Deploy**: Click "Create Web Service"

### 4. Health Check

Your service includes a health check endpoint at `/api/health` that Render will use to monitor your service.

## 📚 API Endpoints

### Health Check
```
GET /api/health
```
Returns service status and timestamp.

### Profile Routes
```
GET /api/v1/profile/:username
```
Fetch LeetCode profile data for a user.

### Problem Routes
```
GET /api/v1/problems/recent/:username
```
Get recent problem submissions for a user.

### Tag Routes
```
GET /api/v1/tags
```
Get available problem tags and categories.

## 🔒 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | Yes | Server port | `10000` |
| `MONGODB_URI` | Optional | Database connection | `mongodb+srv://...` |
| `JWT_SECRET` | Optional | JWT signing secret | `your-secret-key` |
| `ACCESS_TOKEN_SECRET` | Optional | Access token secret | `access-secret` |
| `REFRESH_TOKEN_SECRET` | Optional | Refresh token secret | `refresh-secret` |
| `CORS_ORIGIN` | Yes | Allowed CORS origins | `http://localhost:3000` |
| `FRONTEND_URL` | Optional | Production frontend URL | `https://app.vercel.app` |

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure all TypeScript files compile: `npm run build`
   - Check for missing dependencies: `npm install`

2. **CORS Errors**
   - Verify `CORS_ORIGIN` matches your frontend URL
   - For production, set `FRONTEND_URL` environment variable

3. **Health Check Failures**
   - Check `/api/health` endpoint returns 200 status
   - Verify server starts without errors

4. **MongoDB Connection Issues**
   - Ensure `MONGODB_URI` is correctly formatted
   - Check database connectivity and permissions

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

## 📝 Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run dev` - Build and start development server
- `npm run dev:watch` - Start with nodemon for auto-reload

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For deployment issues or questions:
- Check the [Render documentation](https://render.com/docs)
- Review the application logs in Render dashboard
- Open an issue in the repository

---

**Happy Coding!** 🎯