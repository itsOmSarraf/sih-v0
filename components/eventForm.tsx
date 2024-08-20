'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Profile {
    name: string;
    userName: string;
    pfp: string;
}

interface ConcertBookingFormProps {
    profile: Profile;
}

export default function ConcertBookingForm({ profile }: ConcertBookingFormProps) {
    const [date, setDate] = React.useState<Date | undefined>();

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
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="event-name">Event Name</Label>
                            <Input id="event-name" placeholder="Enter event name" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-description">Description</Label>
                            <Textarea id="event-description" placeholder="Describe your event" />
                        </div>

                        <div className="space-y-2">
                            <Label>Event Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-time">Event Time</Label>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                <Input id="event-time" type="time" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-venue">Venue</Label>
                            <Input id="event-venue" placeholder="Enter venue" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ticket-link">Ticket Link</Label>
                            <Input id="ticket-link" placeholder="Enter ticket link" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-image">Event Image URL</Label>
                            <Input id="event-image" placeholder="Enter image URL" />
                        </div>

                        <Button type="submit" className="w-full">Create Event</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}