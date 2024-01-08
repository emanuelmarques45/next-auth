import { useAuth } from '@/hooks/useAuth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  useAuth();

  async function handleLogout() {
    'use server';
    cookies().delete('NextAuthJWT');
    redirect('/login');
  }

  return (
    <>
      <h1>Dashboard</h1>
      <form action={handleLogout}>
        <button>Logout</button>
      </form>
    </>
  );
}
