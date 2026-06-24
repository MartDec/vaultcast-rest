import { FastifyPluginCallback } from "fastify";
import { LoginInput, loginValidator, RegisterInput, registerValidator } from "./validators/users";
import { createUser, findUser } from "../services/users";
import { compare } from "bcrypt";

const userRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  // Register
  fastify.post<{ Body: RegisterInput }>(
    '/register',
    { schema: { body: registerValidator } },
    async (request, reply) => {
      try {
        const { username, email, password } = request.body;
        const user = await createUser({ username, email, password });
        const token = fastify.jwt.sign({ username, email, id: user.dataValues.id });
        reply
          .setCookie('token', token, {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: true,
            maxAge: 60 * 60,
          })
          .send({ ...user.dataValues, password: undefined });
      } catch (error) {
        reply.send(error);
      }
    }
  );

  // Login
  fastify.post<{ Body: LoginInput }>(
    '/login',
    { schema: { body: loginValidator } },
    async (request, reply) => {
      try {
        const { email, password } = request.body;
        const user = await findUser(email);
        const isMatch = await compare(password, user.dataValues.password);
        if (!isMatch) {
          throw {
            name: 'VaultcastInvalidredentials',
            message: 'invalid email or password'
          }
        }
        const token = fastify.jwt.sign({
          email,
          username: user.dataValues.username,
          id: user.dataValues.id,
        });
        reply
          .setCookie('token', token, {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: true,
            maxAge: 60 * 60,
          })
          .send({ ...user.dataValues, password: undefined });
      } catch (error) {
        reply.send(error);
      }
    },
  );

  done();
}

export default userRoutes;
