'use server';

import { revalidatePath } from 'next/cache';
import { encrypt } from '../../utils/encrypt-decrypt';
import { sql } from '../database';

type CreateUserAccountParams = {
  email: string;
  password: string;
  name: string;
};

async function createUserAccount({
  email,
  password,
  name,
}: CreateUserAccountParams) {
  await sql`INSERT INTO USER_ACCOUNT VALUES(DEFAULT, ${email}, ${encrypt(
    password,
  )}, ${name})`;
  revalidatePath('/');
}

export { createUserAccount };
