'use client';

import { createUserAccount } from '@/services/actions/createUserAccount';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function RegisterForm() {
  const refForm = useRef<HTMLFormElement | null>(null);
  const { push } = useRouter();

  async function handleRegister(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    await createUserAccount({ email, password, name });
    refForm.current?.reset();
    push('/login');
  }

  return (
    <form ref={refForm} action={handleRegister}>
      <input type='text' name='email' placeholder='E-mail' required />
      <input type='password' name='password' placeholder='Password' required />
      <input type='text' name='name' placeholder='Name' required />
      <button>Create user</button>
    </form>
  );
}
