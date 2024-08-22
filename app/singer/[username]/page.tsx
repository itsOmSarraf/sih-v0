'use server'
import { ProfileDataByUsername } from 'app/actions/profile';
import ProfileClient from './ProfileClient';

export default async function ProfilePage({ params }: { params: { username: string } }) {
    const user = await ProfileDataByUsername(params.username);
    return <ProfileClient user={user} />;
}