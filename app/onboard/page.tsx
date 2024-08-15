import { auth } from '@/lib/auth';
import OnboardingForm from './OnboardingForm';

export default async function OnboardingPage() {
    const session = await auth();

    return <OnboardingForm session={session} />;
}