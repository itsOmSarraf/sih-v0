'use server';
import { db } from '@/lib/db';
import { NewSinger, singer } from '@/lib/schema';
import { redirect } from 'next/navigation';

export async function onBoarding(formData: FormData) {
  console.log(formData);

  try {
    // Extract data from FormData
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
      upi_id: formData.get('upiId') as string
    };

    // Validate the data

    // Insert data into the database
    const newSinger = await onboardingDB(singerData);
    // Revalidate the path to update any cached data
    // revalidatePath('/profile');

    console.log(`Profile for ${singerData.name} created successfully`);
    // redirect('/');
  } catch (error) {
    console.error('Onboarding error:', error);
    // You might want to set an error message in a cookie or session here
    // so it can be displayed after the redirect
  }

  // Redirect happens regardless of success or failure
  redirect('/');
}

function formatAddress(city: string, state: string, pincode: string): string {
  return `${city}, ${state} - ${pincode}`.trim();
}

async function onboardingDB(data: NewSinger) {
  try {
    const [newSinger] = await db.insert(singer).values(data).returning();

    if (!newSinger) {
      throw new Error('Failed to insert new singer profile into database');
    }
    console.log('Inserted new singer profile:', newSinger);
    return newSinger;
  } catch (error) {
    console.error('Database operation error:', error);
    throw new Error('Failed to complete database operation');
  }
}
