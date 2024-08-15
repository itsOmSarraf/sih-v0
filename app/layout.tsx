import Navbar from '@/components/Navbar';
import './globals.css';
export const metadata = {
  title: 'MusicReq',
  description:
    'Request Music'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen w-full flex-col bg-gray-200 text-black">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
