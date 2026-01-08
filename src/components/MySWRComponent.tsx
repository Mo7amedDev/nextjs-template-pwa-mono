'use client'

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function MySWRComponent() {
    //const { data } = useSWR('/api/data', fetcher, { revalidateOnFocus: true }); default
    //const { data } = useSWR('/api/data', fetcher, { refreshInterval: 5000 });
    const { data, isLoading, isValidating, mutate } = useSWR(
        '/api/swrDataTest',
        fetcher
    );

    if (isLoading) return <p>Loading...</p>;
    return (
        <div style={{ padding: 16 }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <button onClick={async () => await mutate()}>
                Manual Refresh
            </button>

            {isValidating && <p>Revalidating...</p>}
        </div>
    );
}
