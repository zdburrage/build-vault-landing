import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handler as openaiHandler } from './src/api/openai/assistant.js';

// Load environment variables
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
const assistantId = process.env.OPENAI_ASSISTANT_ID || process.env.VITE_OPENAI_ASSISTANT_ID;
const port = process.env.PORT || 3001;
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:8080', 'http://127.0.0.1:8080'];

if (!apiKey || !assistantId) {
  console.error('Missing required environment variables. Please set either:');
  if (!apiKey) console.error('- OPENAI_API_KEY or VITE_OPENAI_API_KEY');
  if (!assistantId) console.error('- OPENAI_ASSISTANT_ID or VITE_OPENAI_ASSISTANT_ID');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// API Routes
app.post('/api/openai/assistant', async (req, res) => {
  try {
    // Add API key and assistant ID to the request body
    req.body.api_key = apiKey;
    req.body.assistant_id = assistantId;
    await openaiHandler(req, res);
  } catch (error) {
    console.error('Error handling OpenAI request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment variables loaded successfully');
  console.log('Allowed origins:', allowedOrigins);
}); 