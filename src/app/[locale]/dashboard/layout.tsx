import { LeftSideBarContent, RightSidebarContent } from "@/components/dashboard/desktopSidebar";
import Header from "@/components/dashboard/header";
import { DashboardLayout1, DashboardLayout2 } from "@/components/dashboard/layouts";
import { DesktopSidebarWrapper, SidebarProvider } from "@repo/ui";
import { ReactNode } from "react";

const triggersSidebarState = [
    { isOpen: true, side: 'left' },
    { isOpen: false, side: 'right' }
]
export default function DashboardLayout({ children }: { children: ReactNode }) {
    const leftSideBarContent = <LeftSideBarContent/>
    const rightSideBarContent = <RightSidebarContent/>
    return (
        <SidebarProvider
            triggersState={triggersSidebarState}
        >
            <DashboardLayout1
                header={<Header 
                leftSidebarMobileContent={leftSideBarContent}
                rightSidebarMobileContent={rightSideBarContent}
                />}
                leftDesktopSidebar={
                    <DesktopSidebarWrapper dwClose={40}>
                       {leftSideBarContent}
                    </DesktopSidebarWrapper>
                }
                rightDesktopSidebar={
                    <DesktopSidebarWrapper side="right" className="hidden min-w-[1350px]:block">
                        {rightSideBarContent}
                    </DesktopSidebarWrapper>
                }
            >
                {children}
            </DashboardLayout1>
        </SidebarProvider>
    )
}