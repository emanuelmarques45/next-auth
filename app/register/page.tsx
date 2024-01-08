import Link from 'next/link';
import { RegisterForm } from '../components';
import { sql } from '../services/database';
import { User } from '../types/User';
import s from './page.module.css';

export default async function Home() {
  const users: User[] = await sql`SELECT * FROM USER_ACCOUNT`;

  return (
    <main className={s.main}>
      <RegisterForm />
      <Link href='/login'>Login page</Link>
    </main>
  );
}
