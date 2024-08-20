
import { ProfileData } from 'app/actions/profile';
import ConcertBookingForm from './eventForm';

export default async function ConcertBookingWrapper() {
    const profile = await ProfileData();

    return <ConcertBookingForm profile={profile} />;
}