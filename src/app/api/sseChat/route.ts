// app/api/chat/route.ts
import { api } from '@repo/utility';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { threadId, userId, content } = await req.json();
    const AUTHORIZE_API_KEY = '123';//process.env.AUTHORIZE_API_KEY;
    // forward request to FastAPI
    /* const res = await api.post('http://localhost:8000/generale_chat2',
        { threadId, userId, content },
        {
            headers:{
                'Authorization': `Bearer ${AUTHORIZE_API_KEY}`,
                'Content-Type': 'application/json',
            }
        }
    ) */
    const res = await fetch('http://localhost:8000/generale_chat2', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTHORIZE_API_KEY}`, // your server secret
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threadId, userId, content }),
    });

    if (!res.body) {
        return new NextResponse('No body from FastAPI', { status: 500 });
    }

    // Pipe streaming response from FastAPI to frontend
    return new NextResponse(res.body, {
        status: 200,
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
