'use server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { singer } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function ProfileData() {
  const session = await auth();
  const email = session?.user?.email || '';
  const profileData = await db
    .select()
    .from(singer)
    .where(eq(singer.email, email));
  return profileData[0];
}

export async function ProfileDataByUsername(username: string) {
  try {
    const profileData = await db
      .select()
      .from(singer)
      .where(eq(singer.userName, username));
    if (profileData.length === 0) {
      return null; // Return null if no user is found
    }

    return profileData[0]; // Return the first (and should be only) user
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw new Error('Failed to fetch profile data');
  }
}
