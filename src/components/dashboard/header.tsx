'use client';

import { Button, LanguageSelector, MobileSidebar, SideBarTrigger, ThemeSelector } from '@repo/ui';
import { Menu, PanelLeft, PanelRight } from 'lucide-react';

import React from 'react';

interface HeaderProps {
    title?: string;
    leftSidebarMobileContent?: React.ReactNode;
    rightSidebarMobileContent?: React.ReactNode;
}
//'hidden min-[900px]:inline-flex',
export default function Header({
    title,
    leftSidebarMobileContent,
    rightSidebarMobileContent,

}: HeaderProps) {
    return (
        <header className="top-0 z-50 flex h-16 py-3 w-full items-center justify-between border-b bg-background px-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button - Only on small screens */}

                {leftSidebarMobileContent && <MobileSidebar side='left'>{leftSidebarMobileContent}</MobileSidebar>}

                {/* Desktop Left Sidebar Toggle - Only on medium+ screens */}
                <div className='lg:block hidden'>
                    <SideBarTrigger side='left' />
                </div>


                {/* Title */}
                {title && (
                    <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
                )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                <div className='flex gap-2 me-4'>
                    <ThemeSelector />
                    <LanguageSelector />
                </div>
                {/* Desktop Right Sidebar Toggle - Only on medium+ screens */}
                {rightSidebarMobileContent &&
                    <MobileSidebar side='right' className='block min-w-[1350px]:hidden' >
                        {rightSidebarMobileContent}
                    </MobileSidebar>}
                <SideBarTrigger side='right' className='hidden min-w-[1350px]:block' />

            </div>
        </header>
    );
}