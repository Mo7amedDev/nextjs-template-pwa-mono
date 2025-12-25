'use client';
import { useState, useEffect } from 'react';
import { Settings, ChevronLeft, ChevronRight, HomeIcon, Package, ShoppingCart, FileText, User, AlertTriangle, BarChart3, FileBox, LogOut } from 'lucide-react';
import NavLinks from './nav-links';
import { useTranslations } from 'next-intl';
import { Button } from '@repo/ui';
import { cn } from '@/lib/utils';

// Define link types with icons
const linkIcons = {
  dashboard: HomeIcon,
  inventory: Package,
  purchase: ShoppingCart,
  invoices: FileText,
  createInvoice: FileText,
  clients: User,
  lowStock: AlertTriangle,
  analytics: BarChart3,
  reports: FileBox,
  settings: Settings,
  logout: LogOut,
};

export default function DashboardSidebar() {
  const t = useTranslations('DashboardLayout.sidebar');
  const tHeader = useTranslations('DashboardLayout.header');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Get sidebar links from translations
  const sidebarLinks = [
    { key: 'dashboard', href: '/dashboard', icon: linkIcons.dashboard },
    { key: 'inventory', href: '/inventory', icon: linkIcons.inventory },
    { key: 'purchase', href: '/purchase', icon: linkIcons.purchase },
    { key: 'invoices', href: '/invoices', icon: linkIcons.invoices },
    { key: 'createInvoice', href: '/invoices/create', icon: linkIcons.createInvoice },
    { key: 'clients', href: '/clients', icon: linkIcons.clients },
    { key: 'lowStock', href: '/low-stock', icon: linkIcons.lowStock },
    { key: 'analytics', href: '/analytics', icon: linkIcons.analytics },
    { key: 'reports', href: '/reports', icon: linkIcons.reports },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col justify-between border-r bg-background transition-all duration-300 ease-in-out overflow-hidden",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className={cn(
            "flex items-center justify-between p-4 border-b",
            isCollapsed ? "justify-center p-2" : "px-4"
          )}>
            {!isCollapsed && (
              <h2 className="text-xl font-bold truncate">My Logo</h2>
            )}
            <button
              onClick={toggleSidebar}
              className={cn(
                "p-2 rounded-md hover:bg-muted transition-colors",
                isCollapsed && "mx-auto"
              )}
              aria-label={isCollapsed ? t('expand') : t('collapse')}
              title={isCollapsed ? t('expand') : t('collapse')}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          
          <nav className="p-4">
            <div className={cn(
              "flex flex-col gap-2",
              isCollapsed && "items-center"
            )}>
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const label = t(link.key);
                
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      isCollapsed ? "justify-center" : ""
                    )}
                    title={isCollapsed ? label : undefined}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{label}</span>
                    )}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Settings button */}
        <div className={cn(
          "p-4 border-t",
          isCollapsed && "px-2"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              isCollapsed && "justify-center p-2 w-auto"
            )}
          >
            <Settings size={20} />
            {!isCollapsed && <span className="truncate">{t('settings')}</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile overlay when sidebar is open */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full z-50 flex flex-col bg-background border-r transition-transform duration-300 ease-in-out md:hidden",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        <div className="flex-1 overflow-y-auto w-64">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">My Logo</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-muted"
              aria-label={t('close')}
              title={t('close')}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          
          <nav className="p-4">
            <div className="flex flex-col gap-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const label = t(link.key);
                
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings size={20} />
            <span>{t('settings')}</span>
          </Button>
        </div>
      </aside>
    </>
  );
}