'use server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { singer } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function ProfileData() {
  const session = await auth();
  const email = session?.user?.email || '';
  const profileData = db.select().from(singer).where(eq(singer.email, email));
  return profileData;
}

export async function ProfileDatabyUsername(username: any) {
  const profileData = db
    .select()
    .from(singer)
    .where(eq(singer.userName, username));
  return profileData;
}
