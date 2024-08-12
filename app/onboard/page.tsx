import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default async function onboard({ avatarUrl, name, email }: any) {
    const session = await auth();
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={session?.user?.image ?? ''} alt={name} />
                        <AvatarFallback>{session?.user?.name}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form>
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
                </form>
            </CardContent>
            <CardFooter>
                <Button className="w-full" type="submit">Update Profile</Button>
            </CardFooter>
        </Card>
    );
};
