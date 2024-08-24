'use server';
import React from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { APP_NAME } from '@/lib/constants';
import handleLogout from '@/lib/signout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProfileData } from 'app/actions/profile';
export default async function NavBar() {
  const profileData = await ProfileData();
  return (
    <nav className="flex justify-between text-primary items-center p-4 bg-white">
      <Link href="/">{APP_NAME}</Link>
      <div className="flex gap-2">
        <Link href={`/singer/${profileData.userName}`}>
          <Avatar>
            <AvatarImage
              src={profileData.pfp}
              alt={`${profileData.name}'s profile picture`}
            />
            <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through our site</SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <Button onClick={handleLogout}>Logout</Button>
              {
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="block p-2 hover:bg-gray-200 rounded"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block p-2 hover:bg-gray-200 rounded"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block p-2 hover:bg-gray-200 rounded"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block p-2 hover:bg-gray-200 rounded"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
