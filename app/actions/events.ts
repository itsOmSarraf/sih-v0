'use server';
import { db } from '@/lib/db';
import { event } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
export async function GetEvents(username: string) {
  const events = await db
    .select()
    .from(event)
    .where(eq(event.singerUserName, username))
    .orderBy(desc(event.eventDate));
  return events;
}
