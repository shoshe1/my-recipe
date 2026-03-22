require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const { notFound, errorHandler } = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  'http://localhost:3000'
].filter(Boolean);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/favorites', require('./routes/favorities'));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Recipe Manager API',
    status: 'Server is running! 🚀',
    version: '1.0.0',
    database: 'Connected',
    endpoints: {
      auth: '/api/auth (POST /register, POST /login, GET /me)',
      recipes: '/api/recipes (GET, POST, PUT /:id, DELETE /:id)',
      favorites: '/api/favorites (GET, POST, DELETE /:id, POST /toggle, DELETE /)',
      health: '/api/health'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});


// Error Handling Middleware (must be last!)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});