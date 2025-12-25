'use client';

import { useState } from "react";
import { ListStartIcon, Menu, Settings } from "lucide-react";
import { Button, ThemeSelector, LanguageSelector, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui";
import { useTranslations } from 'next-intl';
import NavLinks from './nav-links'; // Import your existing NavLinks component

export function Logo() {
    return <div>My Logo</div>
}

export default function Header() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('DashboardLayout.header');
    const tSidebar = useTranslations('DashboardLayout.sidebar');
    const tTheme = useTranslations('theme');
    
    // Prepare theme translations
    const themeTranslations = {
        light: tTheme('light'),
        dark: tTheme('dark'),
        system: tTheme('system')
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background px-4 py-3 flex items-center justify-between">
            <div className='flex items-center gap-2'>
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button className="p-2 rounded-md border hover:bg-muted">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <SheetHeader className="border-b p-4">
                                <SheetTitle>{tSidebar('navigation')}</SheetTitle>
                            </SheetHeader>
                            <div className='flex flex-col h-full justify-between'>
                                <nav className="flex-1 overflow-y-auto py-4">
                                    <div className="flex flex-col gap-1 px-4">
                                        {/* Use the existing NavLinks component */}
                                        <NavLinks isCollapsed={false} />
                                    </div>
                                </nav>
                                <div className="border-t p-4">
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-start gap-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Settings size={20} />
                                        <span>{tSidebar('settings')}</span>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='hidden md:block'>
                    <Logo />
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <Button>
                    <ListStartIcon className="h-4 w-4" />
                    {t('upgradeNow')}
                </Button>
                <ThemeSelector translations={themeTranslations} />
                <LanguageSelector />
            </div>
        </header>
    );
}