import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from '@/lib/auth';

export default function AddSong() {
    return (
        <div className='flex w-full justify-center items-center h-full'>
            <Card className="w-[350px]">
                <form
                    action={async () => {
                        'use server';
                        await signIn('spotify', {
                            redirectTo: '/'
                        });
                    }}
                    className="w-full"
                >
                    <Button className="w-full">Connect Spotify</Button>
                </form>
                <CardHeader>
                    <CardTitle>Add New Song</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="singer">Singer Name</Label>
                                <Input id="singer" placeholder="Enter singer's name" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="song">Song Name</Label>
                                <Input id="song" placeholder="Enter song name" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type='submit'>Submit</Button>
                </CardFooter>
            </Card>
        </div>
    );
}