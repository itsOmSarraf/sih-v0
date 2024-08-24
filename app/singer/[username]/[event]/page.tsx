import React from 'react';
import { use } from 'react';
import eventDetails from 'app/actions/eventNumber';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';

export default function EventPage({ params }: { params: { username: string; event: number } }) {
    const eventData = use(eventDetails({ username: params.username, eventNo: params.event }));

    if (!eventData) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p>No event found for the given username and event number.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{eventData.name}</CardTitle>
                <CardDescription>{eventData.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>{new Date(eventData.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>{eventData.eventTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>{eventData.venue}</span>
                    </div>
                    {eventData.ticketLink && (
                        <div className="flex items-center space-x-2">
                            <Ticket className="w-5 h-5" />
                            <a href={eventData.ticketLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Get Tickets
                            </a>
                        </div>
                    )}
                    <Badge variant="outline" className="mt-4">
                        Event #{eventData.eventNumber}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}