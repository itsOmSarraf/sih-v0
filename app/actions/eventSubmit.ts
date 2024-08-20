'use server';
import { db } from '@/lib/db';
import { NewEvent, singer, event } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { ProfileDataByUsername } from './profile';
import { eq } from 'drizzle-orm';

async function getNextEventNumber(db: any, singerUserName: string) {
  const currentSinger = await db
    .select({ eventCount: singer.eventCount })
    .from(singer)
    .where(eq(singer.userName, singerUserName))
    .limit(1);

  if (currentSinger.length === 0) {
    throw new Error('Singer not found');
  }

  const nextEventNumber = currentSinger[0].eventCount + 1;

  await db
    .update(singer)
    .set({ eventCount: nextEventNumber })
    .where(eq(singer.userName, singerUserName));

  return nextEventNumber;
}
async function createEvent(db: any, newEvent: NewEvent) {
  const createdEvent = await db
    .insert(event)
    .values({
      ...newEvent
    })
    .returning();
  return createdEvent;
}
export async function eventSubmit(formData: FormData) {
  try {
    const singerUserName = formData.get('singerUserName') as string;
    const existingSinger = await ProfileDataByUsername(singerUserName);

    if (!existingSinger) {
      throw new Error('Singer not found');
    }

    const eventNumber = await getNextEventNumber(db, singerUserName);

    const newEvent: NewEvent = {
      singerUserName,
      eventNumber,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      eventDate: formData.get('eventDate') as string,
      eventTime: formData.get('eventTime') as string,
      venue: formData.get('venue') as string,
      ticketLink: (formData.get('ticketLink') as string) || null,
      image: (formData.get('image') as string) || null
    };
    const createdEvent = await db.insert(event).values(newEvent).returning();

    revalidatePath(`/singers/${singerUserName}`);

    return { success: true, event: createdEvent[0] };
  } catch (error) {
    console.error('Error creating event:', error);
    return { success: false, error: (error as Error).message };
  }
}
