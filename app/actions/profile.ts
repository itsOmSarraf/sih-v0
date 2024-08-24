'use server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { singer } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function ProfileData() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return null; // Return null if no session or email
  }

  const profileData = await db
    .select()
    .from(singer)
    .where(eq(singer.email, email));

  return profileData[0] || null; // Return null if no user found
}

export async function AuthUsername(username: string) {
  const user = await ProfileData();
  return user?.userName === username;
}

export async function ProfileDataByUsername(username: string) {
  try {
    const profileData = await db
      .select()
      .from(singer)
      .where(eq(singer.userName, username));

    return profileData[0] || null; // Return null if no user is found
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw new Error('Failed to fetch profile data');
  }
}
