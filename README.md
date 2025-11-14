# AI-Powered Human Resources Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

## Overview

An intelligent Human Resources Management System powered by Artificial Intelligence technologies. This platform streamlines recruitment processes, automates candidate screening, and provides data-driven insights for better hiring decisions.

## Key Features

### AI-Powered Capabilities
- **Smart Resume Parsing**: Automatic extraction of candidate information from resumes
- **Intelligent Candidate Matching**: AI-driven job-candidate compatibility scoring
- **Sentiment Analysis**: Analyze interview transcripts and candidate communications
- **Predictive Analytics**: Forecast hiring needs and candidate success rates
- **Automated Screening**: AI-assisted initial candidate evaluation

### HR Management
- **Job Posting Management**: Create, edit, and publish job listings
- **Applicant Tracking System (ATS)**: Track candidates through hiring pipeline
- **Interview Scheduling**: Automated calendar management and reminders
- **Employee Database**: Comprehensive employee information management
- **Performance Tracking**: Monitor and evaluate employee performance

### Analytics & Reporting
- **Recruitment Metrics Dashboard**: Real-time hiring statistics
- **Diversity Analytics**: Track and improve hiring diversity
- **Time-to-Hire Analytics**: Optimize recruitment timelines
- **Source Effectiveness**: Measure recruitment channel performance
- **Custom Reports**: Generate tailored HR reports

### User Experience
- **Multi-Language Support**: Full internationalization (English & Polish)
- **Dark Mode**: Seamless theme switching with persistent preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data synchronization across components
- **Intuitive Navigation**: User-friendly interface with modern design patterns

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for modern, responsive UI with dark mode support
- **React Router** for client-side navigation
- **React Context API** for global state management (Dark Mode, i18n)
- **React Hot Toast** for notifications
- **Chart.js** for interactive data visualization
- **Lucide React** for modern iconography
- **localStorage** for persistent user preferences

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Prisma ORM** for database management
- **JWT** for authentication
- **Bcrypt** for password encryption
- **Express Validator** for input validation

### Database
- **PostgreSQL** for relational data storage
- Normalized schema design
- Transaction support
- Full-text search capabilities

### AI/ML Integration
- **OpenAI GPT-4** for natural language processing
- **TensorFlow.js** for client-side ML
- Custom algorithms for candidate matching
- Sentiment analysis API integration

## Project Structure

```
AI-HR-Management-System/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Dashboard, Jobs, Candidates, etc.)
│   │   ├── context/         # React Context providers (DarkMode, Language)
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── assets/          # Static assets
│   └── public/              # Public files
│
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   ├── ai/              # AI integration modules
│   │   └── config/          # Configuration files
│   └── prisma/              # Database schema
│
├── database/                # Database scripts
│   ├── migrations/          # Database migrations
│   └── seeds/               # Seed data
│
├── docs/                    # Documentation
│   └── thesis/              # Thesis document
│
└── diagrams/                # UML diagrams
    ├── use-case/
    ├── activity/
    ├── sequence/
    └── er-diagram/
```

## Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- npm or yarn package manager

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Backend `.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/aihrdb"
JWT_SECRET="your-secret-key-here"
JWT_EXPIRE="24h"
OPENAI_API_KEY="your-openai-api-key"
PORT=5000
NODE_ENV=development
```

**Frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME="AI HR System"
REACT_APP_DEFAULT_LANGUAGE=English
```

### Installation Steps

1. **Clone the repository**
```bash
cd AI-HR-Management-System
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Setup Database**
```bash
npx prisma migrate dev
npx prisma db seed
```

4. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

5. **Start Development Servers**

Backend:
```bash
cd backend
npm run dev
```

Frontend (in new terminal):
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile

### Job Management
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Candidate Management
- `GET /api/candidates` - List candidates
- `POST /api/candidates` - Add candidate
- `GET /api/candidates/:id` - Get candidate details
- `PUT /api/candidates/:id` - Update candidate
- `POST /api/candidates/parse-resume` - AI resume parsing

### AI Features
- `POST /api/ai/match-candidates` - Match candidates to job
- `POST /api/ai/analyze-resume` - AI resume analysis
- `POST /api/ai/sentiment-analysis` - Analyze candidate communication

## Internationalization (i18n)

The application supports multiple languages with real-time switching:

### Supported Languages
- **English** (Default)
- **Polish** (Polski)

### Features
- Context-based language management using React Context API
- Persistent language preference (localStorage)
- Instant UI updates on language change
- Comprehensive translation coverage across all pages:
  - Navigation menus
  - Dashboard analytics
  - Job management
  - Candidate tracking
  - Settings and profile pages
  - Form labels and validation messages
  - Notifications and alerts

### Usage
Users can switch languages from the Settings page. The selected language persists across sessions and page refreshes.

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **SQL Injection Prevention**: Parameterized queries with Prisma
- **XSS Protection**: Input sanitization and validation
- **CORS**: Configured cross-origin resource sharing
- **Rate Limiting**: API request throttling
- **HTTPS**: SSL/TLS encryption in production

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## Deployment

### Production Build

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm run build
```

### Deployment Platforms
- Frontend: Vercel, Netlify
- Backend: Heroku, AWS, DigitalOcean
- Database: AWS RDS, DigitalOcean Managed Databases

## Contributing

This is an academic project developed as part of an Engineering Thesis at Warsaw Management University.

## License

MIT License - See LICENSE file for details

## Author

**Engineering Thesis Project**  
Department of Management and Technical Sciences  
Field of Study: Computer Engineering  
Warsaw Management University  

## Acknowledgments

- Warsaw Management University
- Thesis Supervisor: [Robert Zakrzewski]
- Esra Cicek,77701

---

**Note**: This project demonstrates the integration of AI technologies in HR management systems and serves as a comprehensive example of modern web application development using TypeScript, React, and Node.js.
