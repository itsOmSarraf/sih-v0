'use client'
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

const ConcertBookingForm = () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Concert Booking</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="singer">Singer</Label>
                            <Input id="singer" placeholder="Enter singer's name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="venue">Venue</Label>
                            <Input id="venue" placeholder="Enter venue" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="date">Date & Time</Label>
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
                                    <CalendarComponent
                                        mode="single"
                                        selected={date}
                                        onSelect={(newDate) => setDate(newDate)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="songs">Songs Dashboard</Label>
                            <Input id="songs" placeholder="Enter songs or dashboard link" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="upi">UPI ID</Label>
                            <Input id="upi" placeholder="Enter UPI ID" />
                        </div>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ConcertBookingForm;