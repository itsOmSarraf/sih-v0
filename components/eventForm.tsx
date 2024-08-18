import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { auth } from '@/lib/auth';

export default async function ConcertBookingForm() {
    const session = await auth();
    const email = session?.user?.email;
    // const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
        <div className='w-full flex justify-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className='flex items-center justify-between'>
                        {session?.user?.name}'s event
                        <Avatar>
                            <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? 'user pfp'} />
                            <AvatarFallback>{session?.user?.name}</AvatarFallback>
                        </Avatar>
                    </CardTitle>
                    {/* {session?.user?}  to display username here */}
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    );
};
