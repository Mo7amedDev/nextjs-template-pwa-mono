'use client';

import { Skeleton } from '@repo/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-full mt-2" />
      </CardContent>
    </Card>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[150px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="space-y-2">
          <Skeleton className="h-[350px] w-full rounded-xl" />
          <div className="flex items-center space-x-2 pt-4">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-[60px]" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[150px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-[150px]" />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b">
      {/* Customer Name and Image */}
      <td className="py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
      </td>
      {/* Email */}
      <td className="px-3 py-3">
        <Skeleton className="h-6 w-32" />
      </td>
      {/* Amount */}
      <td className="px-3 py-3">
        <Skeleton className="h-6 w-16" />
      </td>
      {/* Date */}
      <td className="px-3 py-3">
        <Skeleton className="h-6 w-16" />
      </td>
      {/* Status */}
      <td className="px-3 py-3">
        <Skeleton className="h-6 w-16" />
      </td>
      {/* Actions */}
      <td className="py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md border p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center">
          <Skeleton className="mr-2 h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg border">
          <div className="md:hidden">
            {[...Array(6)].map((_, i) => (
              <InvoicesMobileSkeleton key={i} />
            ))}
          </div>
          <table className="hidden min-w-full md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[...Array(6)].map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}