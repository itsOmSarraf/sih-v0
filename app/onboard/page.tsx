import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { onBoarding } from 'app/actions/onboarding';

export default async function onboard() {
    const session = await auth();
    return (
        <div className='flex w-full items-center justify-center'>
            <form action={onBoarding}>
                {/* Hidden fields for session user data */}
                <input type="hidden" name="userName" value={session?.user?.name ?? ''} />
                <input type="hidden" name="userEmail" value={session?.user?.email ?? ''} />
                <input type="hidden" name="userImage" value={session?.user?.image ?? ''} />

                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className='flex items-center justify-between'>
                            {session?.user?.name}
                            <Avatar>
                                <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? 'user pfp'} />
                                <AvatarFallback>{session?.user?.name}</AvatarFallback>
                            </Avatar>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phoneNo">Phone Number</Label>
                                <Input id="phoneNo" name="phoneNo" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="gender">Gender</Label>
                                <Select name="gender">
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
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" name="age" type="number" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" name="state" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input id="pincode" name="pincode" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="upiId">UPI ID</Label>
                                <Input id="upiId" name="upiId" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">Update Profile</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};