'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { onBoarding } from 'app/actions/onboarding';

interface OnboardingFormProps {
    session: {
        user?: {
            email?: string;
            image?: string;
            name?: string;
        };
    };
}

export default function OnboardingForm({ session }: OnboardingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const email = session?.user?.email;
    const userName = email?.split('@')[0];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await onBoarding(formData);

        setIsSubmitting(false);

        if (result.success) {
            router.push(`/profile/${result.userName}`);
        } else {
            setError(result.error || 'An unexpected error occurred');
        }
    };

    return (
        <div className='flex w-full items-center justify-center h-full'>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="userEmail" value={session?.user?.email ?? ''} />
                <input type="hidden" name="userImage" value={session?.user?.image ?? ''} />
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className='flex items-center justify-between'>
                            Singer Onboarding
                            <Avatar>
                                <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? 'user pfp'} />
                                <AvatarFallback>{session?.user?.name}</AvatarFallback>
                            </Avatar>
                        </CardTitle>
                        {session?.user?.email}
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="userName" defaultValue={session?.user?.name ?? ''} required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username" defaultValue={userName ?? ''} required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="upiId">UPI ID</Label>
                                <Input id="upiId" name="upiId" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phoneNo">Phone Number</Label>
                                <Input id="phoneNo" name="phoneNo" required minLength={10} maxLength={10} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <div className="flex flex-col space-y-1.5 w-2/3 ">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select name="gender" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-1/3 flex flex-col space-y-1.5">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" name="age" type="number" required />
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" required />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" name="state" required />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="pincode">Pincode</Label>
                                    <Input id="pincode" name="pincode" required minLength={6} maxLength={6} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center">
                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Profile'}
                        </Button>
                        {error && (
                            <p className="text-red-500 mt-2 text-center">{error}</p>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}