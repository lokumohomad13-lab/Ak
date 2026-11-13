import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

// Trust Railway / Reverse Proxy headers
app.set('trust proxy', 1);
app.disable('x-powered-by');

// 1. Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// 2. Bounded JSON & URL-encoded body parsing
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false, limit: '16kb' }));

// 3. In-Memory Sliding-Window Rate Limiter for /api routes
const rateBuckets = new Map();
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX_REQUESTS = 45;

function apiRateLimiter(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateBuckets.get(ip);

  if (!entry || now > entry.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a minute before retrying.',
    });
  }

  entry.count += 1;
  return next();
}

app.use('/api', apiRateLimiter);

// Input sanitization helper
function sanitizeText(value, maxLen) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLen);
}

// Recent contact inquiries store (in-memory session log)
const recentInquiries = [];

// 4. Healthcheck Endpoint (Railway Compatible)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'mohomad-xmd',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// 5. Public Config Endpoint
app.get('/api/config', (req, res) => {
  res.json({
    brandName: 'MOHOMAD XMD',
    whatsappNumber: process.env.OWNER_WHATSAPP || '94700000000',
    telegramHandle: process.env.OWNER_TELEGRAM || 'mohomadxmd',
    contactEmail: process.env.CONTACT_EMAIL || 'contact@mohomadxmd.dev',
  });
});

// 6. Contact Form Submission Endpoint
app.post('/api/contact', (req, res) => {
  const name = sanitizeText(req.body?.name, 80);
  const email = sanitizeText(req.body?.email, 120);
  const subject = sanitizeText(req.body?.subject, 120);
  const message = sanitizeText(req.body?.message, 2000);

  if (name.length < 2) {
    return res.status(400).json({ error: 'Please enter a valid name (at least 2 characters).' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (subject.length < 3) {
    return res.status(400).json({ error: 'Please provide a clear subject.' });
  }
  if (message.length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
  }

  const referenceId = `XMD-${Date.now().toString(36).toUpperCase()}`;
  recentInquiries.unshift({
    referenceId,
    name,
    email,
    subject,
    receivedAt: new Date().toISOString(),
  });
  if (recentInquiries.length > 50) recentInquiries.pop();

  return res.status(201).json({
    ok: true,
    referenceId,
    message: 'Your inquiry has been received and logged securely.',
  });
});

// 7. Serve Static Assets & Public Website
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: '7d' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// Fallback to public/index.html (or root index.html)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found.' });
  }
  const publicIndex = path.join(__dirname, 'public', 'index.html');
  res.sendFile(publicIndex, (err) => {
    if (err) {
      const rootIndex = path.join(__dirname, 'index.html');
      res.sendFile(rootIndex, (rootErr) => {
        if (rootErr) next(rootErr);
      });
    }
  });
});

// 8. Centralized Error Handler
app.use((err, req, res, _next) => {
  const status = err?.status || 500;
  res.status(status).json({
    error: NODE_ENV === 'production' ? 'Internal server error.' : err?.message || 'Unexpected error.',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MOHOMAD XMD server running on http://0.0.0.0:${PORT}`);
});
