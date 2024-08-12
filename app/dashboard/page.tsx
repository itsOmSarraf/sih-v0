import { auth } from "@/lib/auth"
import Image from "next/image";

export default async function Dashboard() {
    const session = await auth();

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {session?.user?.image && (
                <Image
                    src={session.user.image}
                    alt='User Avatar'
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            )}
            {session?.user?.name && <p>Welcome, {session.user.name}!</p>}
        </div>
    )
}