import { NextResponse } from 'next/server';
import { createSlug } from '@repo/utility';

/**
 * GET /api/testData
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      { id: 1, name: 'Math', slug: 'math' },
      { id: 2, name: 'Physics', slug: 'physics' },
    ],
  });
}

/**
 * POST /api/testData
 */
export async function POST(req: Request) {
  const body = await req.json();

  const name = body?.name ?? 'Untitled';

  const result = {
    id: crypto.randomUUID(),
    name,
    slug: createSlug(name),
  };

  return NextResponse.json(
    {
      success: true,
      data: result,
    },
    { status: 201 }
  );
}
