import { login } from '@/services/actions/login';
// import { useRef, useState } from 'react';
import { Button } from '..';
import { useRouter } from 'next/navigation';

export default async function LoginForm() {
  const { push } = useRouter();
  // const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login({ email, password });
      // setErrorMessage('');
      push('/dashboard');
    } catch (e) {
      // if (e) setErrorMessage('Email or password incorrects');
    }
  }

  return (
    <form action={handleLogin}>
      {/* <p>{errorMessage}</p> */}
      <input type='text' name='email' required />
      <input type='password' name='password' required />
      <Button />
    </form>
  );
}
