'use server';
import { db } from '@/lib/db';
import { Complaint } from '@/lib/schema';

export default async function getAllComplaints() {
  try {
    const AllComplaints = await db.select().from(Complaint);
    console.log(AllComplaints);
    return AllComplaints;
  } catch (error) {
    console.log(error);
    return error;
  }
}
