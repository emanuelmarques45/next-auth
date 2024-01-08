'use client';

import { useFormStatus } from 'react-dom';

export default function Button() {
  const { pending } = useFormStatus();

  return <button>{pending ? '...' : 'Login'}</button>;
}
