// app/dashboard/page.tsx

import Breadcrumbs from '@/components/breadcrumbs';
import ServerCard from '@/components/dashboard/cards';
import Pagination from '@/components/dashboard/pagination';
import Search from '@/components/dashboard/search';
import { CardSkeleton } from '@/components/dashboard/skeletons/skeletons';
import { MySWRComponent } from '@/components/MySWRComponent';
import { ScrollArea, SideBarTrigger } from '@repo/ui';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Suspense } from 'react';

export default async function DashboardPage({
    searchParams
}: { searchParams: Promise<{ query?: string, page?: string }> }) {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops', href: '/products/electronics/laptops', active: true },
    ];
    const { query, page } = await searchParams;
    console.log({ query, page });
    return (
        <main className="h-full flex flex-1 flex-col gap-6 overflow-hidden">
            <div className='flex bg-gray-800'>
                <div>
                    <Breadcrumbs breadcrumbs={breadcrumbItems} />

                    <h1 className="text-3xl font-bold">Laptops</h1>
                    {/* page content */}
                </div>
                <SideBarTrigger side='left'
                    iconOpen={<ChevronRight className="h-5 w-5" />}
                    iconClose={<ChevronLeft className="h-5 w-5" />}
                />
                <h1 className="text-3xl font-bold p-8 "> Welcome back eeeeeeeeeeeeeeeee</h1>
                <div className='p-3'>
                    <Search />
                </div>
            </div>
            <div className='m-auto'>
                <Pagination totalPages={5} />

            </div>
            <MySWRComponent/>
            <Suspense fallback={<CardSkeleton />}>
                <ServerCard />
            </Suspense>

            <ScrollArea className=' flex-1  px-4  '>
                <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-3 w-full">
                    <StatCard title="Total Revenue" value="$45,231" change="+20.1%" />
                    <StatCard title="Subscriptions" value="+2350" change="+180.1%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                    <StatCard title="Active Users" value="12,234" change="-19%" />
                </div>
            </ScrollArea>
        </main >


    );
}

// Example components for demo


function ActivityItem({ text, time }: { text: string; time: string }) {
    return (
        <div className="rounded-lg border p-3">
            <p className="text-sm">{text}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
        </div>
    );
}

function StatCard({ title, value, change }: {
    title: string;
    value: string;
    change: string
}) {
    const isPositive = change.startsWith('+');

    return (
        <div className="rounded-lg border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="mt-2 text-2xl font-bold">{value}</p>
            <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change} from last month
            </p>
        </div>
    );
}