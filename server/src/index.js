import app from './app.js';
import config from './config/env.js';

const PORT = process.env.PORT || config.port || 5000;
const HOST = process.env.HOST || '0.0.0.0';

let server = null;

// Only skip the HTTP listener on Vercel serverless; Railway is a long-running host even if VERCEL is set
const isServerless = Boolean(process.env.VERCEL) && !process.env.RAILWAY_ENVIRONMENT_ID;
if (!isServerless) {
  server = app.listen(PORT, HOST, () => {
    console.log(`====================================================`);
    console.log(`🚀 CartPilot AI Server running on ${HOST}:${PORT}`);
    console.log(`📡 Health Check:  http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/health`);
    console.log(`📡 API Health:    http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/api/health`);
    console.log(`🌍 Environment:   ${config.nodeEnv}`);
    console.log(`====================================================`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\n[Server] Gracefully shutting down...');
    if (server) {
      server.close(() => {
        console.log('[Server] HTTP server closed.');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

export default app;
