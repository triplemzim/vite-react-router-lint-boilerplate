import { z } from 'zod';

const loginSchema = z.object({
  username: z.string(),
  // .email({ message: 'Please provide your valid email address' }),
  password: z.string(),
  // .min(6, { message: 'Please enter your valid password' })
  // .max(50),
});

export default loginSchema;
