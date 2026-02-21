'use client'

import { useInfiniteScroll } from "@repo/ui";

type Item = {
  id: number;
  name: string;
};

export default function Page() {

  const { lastElementRef, data, loading,hasMore } = useInfiniteScroll<Item>({
    URL: '/api/items',
  });

  return (
    <div className="space-y-4 max-h-[500px] overflow-auto max-w-md m-auto">
      {data.map((item, index) => (
        <div
          key={item.id}
          ref={index === data.length - 1 ? lastElementRef : null}
          className="border p-4"
        >
          {item.name}
        </div>
      ))}
       
      {!hasMore && <p>No More Items</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}
