import { ProfileData } from 'app/actions/profile';
import ConcertBookingForm from './eventForm';

export default async function ConcertBookingWrapper() {
    const profile = await ProfileData();

    if (!profile) {
        // Handle the case where no profile data is available
        return <div>Please log in to book a concert.</div>;
    }

    return <ConcertBookingForm profile={profile} />;
}