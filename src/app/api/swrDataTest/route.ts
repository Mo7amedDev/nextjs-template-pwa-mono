import { NextResponse } from 'next/server';

let counter = 0;

export async function GET() {
  counter++;

  await new Promise((res)=>setTimeout(res,Math.random()*2000))

  return NextResponse.json({
    message: 'Hello from fake SWR API',
    counter,
    serverTime: new Date().toISOString(),
    random: Math.floor(Math.random() * 1000),
  });
}
