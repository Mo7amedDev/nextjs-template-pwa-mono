'use client'
import { HomeIcon, Package, ShoppingCart, FileText, User, AlertTriangle, BarChart3, FileBox } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

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
};

interface NavLinksProps {
  isCollapsed?: boolean;
}

export default function NavLinks({ isCollapsed = false }: NavLinksProps) {
  const pathname = usePathname();
  const t = useTranslations('DashboardLayout.sidebar');
  
  const links = [
    { key: 'dashboard', href: '/dashboard' },
    { key: 'inventory', href: '/inventory' },
    { key: 'purchase', href: '/purchase' },
    { key: 'invoices', href: '/invoices' },
    { key: 'createInvoice', href: '/invoices/create' },
    { key: 'clients', href: '/clients' },
    { key: 'lowStock', href: '/low-stock' },
    { key: 'analytics', href: '/analytics' },
    { key: 'reports', href: '/reports' },
  ];
  
  return (
    <TooltipProvider>
      {links.map((link) => {
        const LinkIcon = linkIcons[link.key as keyof typeof linkIcons];
        const isActive = pathname === link.href;
        const label = t(link.key);
        
        const linkContent = (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'hover:bg-muted hover:text-foreground'
            )}
          >
            <LinkIcon className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && (
              <span className="truncate">{label}</span>
            )}
          </Link>
        );

        if (isCollapsed) {
          return (
            <Tooltip key={link.key} delayDuration={0}>
              <TooltipTrigger asChild>
                {linkContent}
              </TooltipTrigger>
              <TooltipContent side="right" className="z-[60]">
                {label}
              </TooltipContent>
            </Tooltip>
          );
        }

        return linkContent;
      })}
    </TooltipProvider>
  );
}