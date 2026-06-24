import { FastifyPluginCallback } from "fastify";
import { RegisterInput, registerValidator } from "./validators/users";

const userRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.post<{ Body: RegisterInput }>(
    '/register',
    { schema: { body: registerValidator } },
    async (request, reply) => {
      const { username, email } = request.body;
      reply.send({ username, email });
    }
  );

  done();
}

export default userRoutes;
