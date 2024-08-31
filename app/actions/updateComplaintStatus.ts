'use server';
import { db } from '@/lib/db';
import { Complaint } from '@/lib/schema';
import { eq } from 'drizzle-orm';

type ComplaintStatus = 'to-do' | 'in-progress' | 'resolved';

export async function updateComplaintStatus(
  uuid: string,
  newStatus: ComplaintStatus
): Promise<typeof Complaint.$inferSelect> {
  console.log(`Attempting to update complaint ${uuid} to status ${newStatus}`);

  // Validate the newStatus
  const validStatuses: ComplaintStatus[] = ['to-do', 'in-progress', 'resolved'];
  if (!validStatuses.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  try {
    const updatedComplaints = await db
      .update(Complaint)
      .set({
        status: newStatus,
        updated_at: new Date()
      })
      .where(eq(Complaint.uuid, uuid))
      .returning();

    if (updatedComplaints.length === 0) {
      throw new Error(`No complaint found with uuid ${uuid}`);
    }

    const updatedComplaint = updatedComplaints[0];
    console.log('Updated complaint:', updatedComplaint);

    // Verify that the status was updated correctly
    if (updatedComplaint.status !== newStatus) {
      throw new Error(
        `Status was not updated correctly. Expected ${newStatus}, got ${updatedComplaint.status}`
      );
    }

    return updatedComplaint;
  } catch (error) {
    console.error('Error updating complaint status:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to update complaint status: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while updating complaint status'
      );
    }
  }
}
