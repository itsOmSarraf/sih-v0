import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileData } from 'app/actions/profile';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';


export default async function Profile() {
    const users = await ProfileData();
    const user = users[0]; // Assuming we want the first user in the array

    return (
        <div className="flex items-center justify-center h-full bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {user.name}
                        <Avatar>
                            <AvatarImage src={user.pfp || undefined} alt={`${user.name}'s profile picture`} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.contactNo}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>UPI ID:</strong> {user.upi_id}</p>
                    </div>
                </CardContent>
                <div className="px-6 pb-6">
                    <Button className="w-full">
                        Add Event <CirclePlus className="ml-2" />
                    </Button>
                </div>
            </Card>
        </div>
    );
};