'use client';
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

export default function NavBar() {
  const [profileData, setProfileData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await ProfileData();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const isLoggedIn = profileData && profileData.userName && profileData.name;

  return (
    <nav className="flex justify-between text-primary items-center p-4 bg-white">
      <Link href="/">{APP_NAME}</Link>
      <div className="flex gap-2">
        {isLoggedIn && (
          <Link href={`/singer/${profileData.userName}`}>
            <Avatar>
              <AvatarImage
                src={profileData.pfp}
                alt={`${profileData.name}'s profile picture`}
              />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
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
              {isLoggedIn ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
              <ul className="space-y-2 mt-4">
                <li>
                  <Link
                    href="/"
                    className="block p-2 hover:bg-gray-200 rounded"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block p-2 hover:bg-gray-200 rounded"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="block p-2 hover:bg-gray-200 rounded"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block p-2 hover:bg-gray-200 rounded"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
