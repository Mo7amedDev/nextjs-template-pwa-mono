import { lusitana } from "@/components/fonts";
 
import { Suspense } from "react";
import Table from "./tableTest";
import Search from "@/components/dashboard/search";
import { CardsSkeleton, InvoicesTableSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/components/dashboard/skeletons/skeletons";
import CardWrapper, { LatestInvoices, RevenueChart } from "@/components/dashboard/cards";
import Pagination from "@/components/dashboard/pagination";
 
async function fetchInvoicesPages(query:string) {
    //await new Promise((res)=>setTimeout(res,100));
    return 10;
}


export default async function OverviewPage({
    searchParams
}:{searchParams:Promise<{query?:string,page?:string}>}){

    const {query,page:currentPage} = await searchParams;
    const totalPages = await fetchInvoicesPages(query || '');
    
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <Search   />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
               
                <Suspense fallback={<CardsSkeleton/>}>
                    <CardWrapper />
                </Suspense>
            </div>
            <Suspense key={(query ||'') + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query || ''} currentPage={Number(currentPage) || 1} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
 
               <Suspense fallback={<RevenueChartSkeleton/>}>
                    <RevenueChart/>
               </Suspense>
 
                <Suspense fallback={<LatestInvoicesSkeleton/>}>
                    <LatestInvoices/>
                </Suspense>
            </div>
            
        </main>
    )
}