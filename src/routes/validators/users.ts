import { z } from 'zod';

export const registerValidator = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof registerValidator>;
