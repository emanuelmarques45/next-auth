import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function useAuth() {
  const cookie = cookies().get('NextAuthJWT');
  if (!cookie) return redirect('/login');

  return cookie.value;
}

export { useAuth };
