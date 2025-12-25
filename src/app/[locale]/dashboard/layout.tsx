import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import Header from "@/components/dashboard/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function PublicLayout({children}:{children: React.ReactNode,}
) {

    
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <DashboardSidebar />
                <main className="flex-1 flex-col overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}