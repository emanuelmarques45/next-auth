'use client';

import axios from 'axios';

type LoginParams = {
  email: string;
  password: string;
};

async function login({ email, password }: LoginParams) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    JSON.stringify({ email, password })
  );
}

export { login };
