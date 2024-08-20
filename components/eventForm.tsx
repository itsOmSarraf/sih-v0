'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { eventSubmit } from '../app/actions/eventSubmit'; // Import the server action
import { useRouter } from 'next/navigation';
interface Profile {
    name: string;
    userName: string;
    pfp: string;
}

interface ConcertBookingFormProps {
    profile: Profile;
}

export default function ConcertBookingForm({ profile }: ConcertBookingFormProps) {
    const router = useRouter();
    return (
        <div className='w-full flex justify-center'>
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle className='flex items-center justify-between'>
                        {profile.name}'s New Event
                        <Avatar>
                            <AvatarImage src={profile.pfp} alt={profile.name} />
                            <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">@{profile.userName}</p>
                </CardHeader>
                <CardContent>
                    <form action={eventSubmit} className="space-y-4">
                        <input type="hidden" name="singerUserName" value={profile.userName} />

                        <div className="space-y-2">
                            <Label htmlFor="name">Event Name</Label>
                            <Input id="name" name="name" placeholder="Enter event name" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" placeholder="Describe your event" />
                        </div>

                        <div className='flex justify-between space-x-2'>
                            <div className="space-y-2 w-full">
                                <Label htmlFor="eventDate">Event Date</Label>
                                <Input id='eventDate' name="eventDate" type='date' required />
                            </div>
                            <div className="space-y-2 w-full">
                                <Label htmlFor="eventTime">Event Time</Label>
                                <Input id="eventTime" name="eventTime" type="time" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="venue">Venue</Label>
                            <Input id="venue" name="venue" placeholder="Enter venue" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ticketLink">Ticket Link</Label>
                            <Input id="ticketLink" name="ticketLink" placeholder="Enter ticket link" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Event Image URL</Label>
                            <Input id="image" name="image" placeholder="Enter image URL" />
                        </div>

                        <Button type="submit" className="w-full"
                            onClick={
                                () => router.push(`singer/${profile.userName}`)
                            }
                        >Create Event</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}