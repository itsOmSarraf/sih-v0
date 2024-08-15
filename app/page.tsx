'use client'
import { Button } from "@/components/ui/button"
import handleLogout from "@/lib/signout"

export default function Home() {

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4">Home Page</div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}