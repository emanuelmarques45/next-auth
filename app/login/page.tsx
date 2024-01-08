'use client';

import React from 'react';
import { LoginForm } from '../components';
import s from './page.module.css';
import Link from 'next/link';

export default function Login() {
  return (
    <main className={s.main}>
      <LoginForm />
      <Link href='/register'>Register page</Link>
    </main>
  );
}
