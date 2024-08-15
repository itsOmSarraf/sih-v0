'use server';

import { db } from '@/lib/db';
import { singer } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth'; // Adjust this import based on where you've placed your NextAuth config

export async function checkUserAndRedirect() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect('/login'); // Redirect back to login if no session
  }

  const email = session.user.email;

  // Check if user exists in the database
  const existingSinger = await db
    .select()
    .from(singer)
    .where(eq(singer.email, email))
    .limit(1);

  if (existingSinger.length > 0) {
    redirect('/profile'); // User exists, redirect to profile
  } else {
    redirect('/onboard'); // User doesn't exist, redirect to onboarding
  }
}
