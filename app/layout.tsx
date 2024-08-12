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
      <body className="flex min-h-screen w-full flex-col bg-black">{children}</body>
    </html>
  );
}
