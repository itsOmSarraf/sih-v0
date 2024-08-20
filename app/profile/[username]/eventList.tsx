import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { GetEvents } from 'app/actions/events';
import { Event } from '@/lib/schema';
import Image from 'next/image';

function EventCard({ event }: { event: Event }) {
    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <p>{event.description}</p>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(new Date(event.eventDate), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center mb-2">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{format(new Date(`2000-01-01T${event.eventTime}`), 'h:mm a')}</span>
                </div>
                <div className="flex items-center mb-2">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.venue}</span>
                </div>
                {/* {event.image && (
                    <Image
                        src={event.image}
                        alt={event.name}
                        className="w-full h-40 object-cover rounded-md mt-2"
                    />
                )} */}
            </CardContent>
            <div className="px-6 py-4 flex justify-between">
                <Badge variant="secondary">Event #{event.eventNumber}</Badge>
                {event.ticketLink && (
                    <Button variant="outline" size="sm">
                        <Ticket className="mr-2 h-4 w-4" />
                        Buy Tickets
                    </Button>
                )}
            </div>
        </Card>
    );
}

export default async function SingerEventsPreview({ userName }: { userName: string }) {
    const events = await GetEvents(userName);
    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                {events.map((event: Event) => (
                    <EventCard key={`${userName}-${event.eventNumber}`} event={event} />
                ))}
            </ScrollArea>
        </div>
    );
}