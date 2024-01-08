import { sql } from '@/services/database';
import { User } from '@/types/User';
import { encrypt } from '@/utils/encrypt-decrypt';
import { sign } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

async function POST(req: Request) {
  const { email, password }: User = await req.json();
  const encryptedPassword = encrypt(password);
  const databasePassword = (
    await sql`SELECT PASSWORD FROM USER_ACCOUNT WHERE EMAIL=${email}`
  )[0].password;

  if (!(encryptedPassword === databasePassword)) {
    return NextResponse.json({ logged: false }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET || '';

  const data = Buffer.from(JSON.stringify(email));

  const privateKey = process.env.PRIVATE_KEY!;

  const token = sign('SHA256', data, privateKey);

  const signature = token.toString('base64');

  const MAX_AGE = 60 * 60 * 60; // 1 hour;

  cookies().set('NextAuthJWT', signature, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  return NextResponse.json({ logged: true }, { status: 200 });
}

export { POST };
