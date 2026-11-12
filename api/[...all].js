import handler, { forwardToExternalBackend, resolveIncomingPath } from './index.js';

export { forwardToExternalBackend, resolveIncomingPath };

/**
 * Vercel Serverless Function Catch-All Handler for /api/*
 * Captures all sub-routes (e.g. /api/auth/register, /api/products, /api/cart, /api/orders)
 * and transparently forwards them to the Render backend service.
 */
export default handler;
