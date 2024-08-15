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
export default function NavBar() {
  return (
    <nav className="flex justify-between text-primary items-center p-4 bg-white">
      <Link href="/">{APP_NAME}</Link>
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
          {/* <div className="mt-4">
            <ul className="space-y-2">
              <li>
                <Link href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="block p-2 hover:bg-gray-200 rounded">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Contact
                </Link>
              </li>
            </ul>
          </div> */}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
