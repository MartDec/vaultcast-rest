import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
// import { userRoutes } from './routes/users.js';

dotenv.config();

// Création de l'instance Fastify
const fastify = Fastify({
  logger: process.env.NODE_ENV === 'development',
});

// Middlewares globaux
await fastify.register(cors, {
  origin: true, // À configurer selon tes besoins
});
await fastify.register(helmet);

// Routes
// await fastify.register(userRoutes, { prefix: '/api/users' });

// Route de santé
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Gestionnaire d'erreurs global
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ 
    error: 'Internal server error',
    // @ts-ignore
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Démarrage du serveur
const start = async () => {
  try {
    await connectDatabase();
    const port = parseInt(process.env.PORT || '3000');
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📝 API documentation: http://localhost:${port}/health`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
