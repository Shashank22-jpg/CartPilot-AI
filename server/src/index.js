import app from './app.js';
import config from './config/env.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 CartPilot AI Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment:  ${config.nodeEnv}`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
const shutdown = () => {
  console.log('\n[Server] Gracefully shutting down...');
  server.close(() => {
    console.log('[Server] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

export default server;
