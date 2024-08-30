'use server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { Complaintread, Complaint } from '@/lib/schema';

export default async function searchUUID(uuid: string) {
  console.log(uuid);
  try {
    const data = await db
      .select()
      .from(Complaint)
      .where(eq(Complaint.uuid, uuid)); // Added await
    if (data.length > 0) {
      // Changed condition to check for data length
      console.log(data);
      return data;
    } else {
      return 'no data found';
    }
  } catch (error) {
    // Added error handling
    console.error('Error fetching data:', error);
    return 'error occurred while fetching data';
  }
}
