import { ReactNode } from "react"

type DashboardLayoutType = {
    children: ReactNode;
    leftDesktopSidebar?: ReactNode;
    rightDesktopSidebar?: ReactNode;
    header?: ReactNode;
}

export function DashboardLayout1({
    children,
    leftDesktopSidebar,
    rightDesktopSidebar,
    header,
}: DashboardLayoutType) {

    return (
        <div   className="h-screen w-screen overflow-hidden flex flex-col">
            {header}
            <div className="flex flex-1 justify-between overflow-hidden w-full">
                {leftDesktopSidebar}
                {children}
                {rightDesktopSidebar}
            </div>
        </div>
    )
}
export function DashboardLayout2({
    children,
    leftDesktopSidebar,
    rightDesktopSidebar,
    header,
}: DashboardLayoutType) {

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-1">
            {leftDesktopSidebar}
            <div className="flex flex-col flex-1">
                {header}
                {children}
            </div>
            {rightDesktopSidebar}
            
        </div>
    )
}