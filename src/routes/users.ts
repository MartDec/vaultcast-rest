import { FastifyPluginCallback } from "fastify";
import { RegisterInput, registerValidator } from "./validators/users";
import { createUser } from "../services/users";

const userRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.post<{ Body: RegisterInput }>(
    '/register',
    { schema: { body: registerValidator } },
    async (request, reply) => {
      try {
        const { username, email, password } = request.body;
        const user = await createUser({ username, email, password });
        const token = fastify.jwt.sign({ username, email });
        reply.send({ token, user: { ...user.dataValues, password: undefined } });
      } catch (error) {
        reply.send(error);
      }
    }
  );

  done();
}

export default userRoutes;
