 
 
import { lusitana } from '@/components/fonts';
import { Banknote, CalendarIcon, ClockIcon, InboxIcon, User2Icon } from 'lucide-react';

const iconMap = {
  collected: Banknote,
  customers: User2Icon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
    // simulate fetching data
    await new Promise((res)=>setTimeout(res,100));
  
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Cardw title="Collected" value={5} type="collected" />
      <Cardw title="Pending" value={8} type="pending" />
      <Cardw title="Total Invoices" value={3} type="invoices" />
      <Cardw
        title="Total Customers"
        value={4}
        type="customers"
      />
    </>
  );
}

export function Cardw({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}


export async function RevenueChart() {
  const chartHeight = 350;
  await new Promise((res)=>setTimeout(res,2000))
  return (
    <div className='w-200 h-200 bg-amber-200'>
      graph....
    </div>
  )
}

export async function LatestInvoices() {
  const chartHeight = 350;
  await new Promise((res)=>setTimeout(res,2000))
  return (
    <div className='w-100 h-200 bg-blue-500'>
     invoices....
    </div>
  )
}