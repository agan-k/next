import { Suspense } from 'react';
import Table from '@/app/ui/customers/table';
import Search from '@/app/ui/search';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchCustomersPages } from '@/app/lib/data';
import Pagination from '@/app/ui/customers/pagination';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export default async function Page({ searchParams,}: {  searchParams?: {
  query?:string;
  page?:string;
};
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

  return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
        </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}></Suspense>
          <Table query={query} currentPage={currentPage}/>
        <div className="mt-5 flex w-full justify-center">
        <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
        </div>
      </div>
  );
}