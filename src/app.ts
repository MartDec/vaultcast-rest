import { validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt'
import dotenv from 'dotenv';
import { connectDatabase } from './db/lib/sequelize';
import { performMigrations } from './db/index';
import userRoutes from './routes/users';
import config from './config/config';

dotenv.config();

const fastify = Fastify({
  logger: process.env.NODE_ENV === 'development',
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(() => {
  return data => JSON.stringify(data);
});

// Middlewares
await fastify.register(cors, { origin: true });
await fastify.register(helmet);
await fastify.register(jwt, { secret: config.session.jwtSecret });

// Routes
await fastify.register(userRoutes, { prefix : '/api' });

// Global error handling
fastify.setErrorHandler((error: any, _request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
});

const start = async () => {
  try {
    await connectDatabase();
    await performMigrations();
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
