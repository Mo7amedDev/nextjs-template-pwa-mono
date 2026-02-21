import { NextRequest, NextResponse } from "next/server";

type Item = {
    id: number;
    name: string;
};

// 🔥 mock DB (200 items)
const MOCK_ITEMS: Item[] = Array.from({ length: 200 }).map((_, i) => ({
    id: i + 1,
    name: `Mock Item ${i + 1}`,
}));

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = page === 3 ? 39 : Number(searchParams.get("limit") ?? 40);


    const start = (page - 1) * limit;
    const end = start + limit;

    const items = MOCK_ITEMS.slice(start, end);

    // simulate db delay
    await new Promise(res => setTimeout(res, 1500));

    return NextResponse.json(items);
}
