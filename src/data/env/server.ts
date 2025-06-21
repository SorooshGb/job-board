import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DB_HOST: z.string().nonempty(),
    DB_PASSWORD: z.string().nonempty(),
    DB_USER: z.string().nonempty(),
    DB_PORT: z.string().nonempty(),
    DB_NAME: z.string().nonempty(),
  },
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT, ...rest } = val;
      return {
        ...rest,
        DATABASE_URL:
          `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      };
    });
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
