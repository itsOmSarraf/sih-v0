import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { event, singer } from '@/lib/schema';
import { and, eq } from 'drizzle-orm';

export default async function eventDetails({
  username,
  eventNo
}: {
  username: string;
  eventNo: number;
}) {
  const eventData = await db
    .select()
    .from(event)
    .where(
      and(eq(event.singerUserName, username), eq(event.eventNumber, eventNo))
    );

  return eventData[0] || null; // Return the first matching event or null if not found
}
