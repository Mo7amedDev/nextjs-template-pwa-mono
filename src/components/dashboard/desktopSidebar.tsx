'use client'
import { ScrollArea, SidebarItemLink } from "@repo/ui";
import { LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export function LeftSideBarContent() {
    const pathname = usePathname();
    const links = [
        { href: '/dashboard', Icon: LayoutDashboard, label: 'Dashboard1' },
        { href: '/dashboard/workspace', Icon: LayoutDashboard, label: 'workspace' },
        { href: '/dashboard', Icon: LayoutDashboard, label: 'Dashboard3' },
        { href: '/workspace3', Icon: LayoutDashboard, label: 'Dashboard4' },
        { href: '/dashboard', Icon: LayoutDashboard, label: 'Dashboard5' },
        { href: '/dashboard', Icon: LayoutDashboard, label: 'Dashboard6' },
        { href: '/dashboard', Icon: LayoutDashboard, label: 'Dashboard5d' },
    ]
    return (
        <ScrollArea className=" h-full border-r overflow-auto ">
            <nav className={`
            space-y-1 w-full pt-4  
            bg-background text-nowrap`}>
                {links.map((link) => (
                    <SidebarItemLink 
                    key={link.label} href={link.href}
                     icon={<link.Icon size={20} />} 
                     label={link.label} 
                     active={pathname.includes(link.href)}
                      />
                ))}
            </nav>
        </ScrollArea>
    )
}
function ActivityItem({ text, time }: { text: string; time: string }) {
    return (
        <div className="rounded-lg border p-3">
            <p className="text-sm">{text}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
        </div>
    );
}
export function RightSidebarContent(){
    return (
        <ScrollArea className="relative overflow-auto h-full">
            <div >
                <h3 className="mb-4 font-semibold sticky left-0 bg-gray-900 top-0 p-2 w-full">Activity Feed</h3>
                <nav className="space-y-3 p-4 w-full top-16 bg-background text-nowrap border-l">
                    <ActivityItem text="User John logged in" time="2 min ago" />
                    <ActivityItem text="Report generated" time="15 min ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="1 hour ago" />
                    <ActivityItem text="Settings updated" time="3 hour ago" />
                </nav>
            </div>
        </ScrollArea>
    )
}