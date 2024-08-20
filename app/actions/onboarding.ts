'use server';
import { db } from '@/lib/db';
import { NewSinger, singer } from '@/lib/schema';

export async function onBoarding(formData: FormData) {
  try {
    const singerData: NewSinger = {
      name: formData.get('userName') as string,
      email: formData.get('userEmail') as string,
      pfp: formData.get('userImage') as string,
      contactNo: formData.get('phoneNo') as string,
      gender: (formData.get('gender') as string)?.charAt(0) || null,
      age: formData.get('age')
        ? parseInt(formData.get('age') as string, 10)
        : null,
      address: formatAddress(
        formData.get('city') as string,
        formData.get('state') as string,
        formData.get('pincode') as string
      ),
      upi_id: formData.get('upiId') as string,
      userName: formData.get('username') as string
    };
    const newSinger = await onboardingDB(singerData);
    console.log(`Profile for ${singerData.name} created successfully`);
    return { success: true, userName: newSinger.userName };
  } catch (error: any) {
    console.error('Onboarding error:', error);
    return { success: false, error: getUserFriendlyError(error) };
  }
}

function formatAddress(city: string, state: string, pincode: string): string {
  return `${city}, ${state} - ${pincode}`.trim();
}

async function onboardingDB(data: NewSinger) {
  try {
    const [newSinger] = await db.insert(singer).values(data).returning();
    if (!newSinger) {
      throw new Error('Failed to insert new singer profile');
    }
    console.log('Inserted new singer profile:', newSinger);
    return newSinger;
  } catch (error: any) {
    console.error('Database operation error:', error);
    throw error; // Propagate the original error
  }
}

function getUserFriendlyError(error: any): string {
  if (error.code === '23505') {
    if (error.constraint === 'singer_username_unique') {
      return 'This username is already taken. Please choose a different one.';
    }
    if (error.constraint === 'singer_email_unique') {
      return 'An account with this email already exists. Please use a different email or try logging in.';
    }
    return 'Some of the information you provided is already in use. Please check and try again.';
  }

  if (error.code === '23502') {
    return 'Please make sure all required fields are filled out.';
  }

  if (error.code === '22001') {
    return 'Some of the information you entered is too long. Please shorten your responses and try again.';
  }

  if (error.message && error.message.includes('Failed to insert')) {
    return "We couldn't create your profile at this time. Please try again later.";
  }

  // Generic error message for any other errors
  return 'Something went wrong while creating your profile. Please try again or contact support if the problem persists.';
}
