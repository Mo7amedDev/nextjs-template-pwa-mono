

async function fetchFilteredInvoices(query: string, currentPage: number) {
    //await new Promise((res) => setTimeout(res, 200));
    return query + currentPage.toString();

}


export default async function Table({ query, currentPage }: { query: string, currentPage: number }) {
    const invoices = await fetchFilteredInvoices(query, currentPage);
    return (
        <div className="w-100 h-100 bg-red-400">
            {invoices}
        </div>
    )
}