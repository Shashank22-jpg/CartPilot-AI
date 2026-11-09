/**
 * CartPilot AI - Rate Limiting Middleware
 * In-memory sliding window rate limiter for Gemini AI endpoints
 */

const ipRequestMap = new Map();

// Periodic cleanup of expired rate limit windows every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestMap.entries()) {
    if (now - data.resetTime > 60000) {
      ipRequestMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function rateLimiter({ windowMs = 60 * 1000, max = 30, message = 'Rate limit exceeded. Please wait a moment before sending another message.' } = {}) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let record = ipRequestMap.get(ip);
    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs,
      };
      ipRequestMap.set(ip, record);
    } else {
      record.count += 1;
    }

    const remaining = Math.max(0, max - record.count);
    const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetSeconds);

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        error: message,
        retryAfterSeconds: resetSeconds,
      });
    }

    next();
  };
}

export default rateLimiter;
