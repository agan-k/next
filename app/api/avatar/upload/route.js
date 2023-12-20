import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
 
  const blob = await put(filename, request, {
    access: 'public',
  });
 
  return NextResponse.json(blob);
}
// export async function POST(request: Request): Promise<NextResponse> {
//   const { searchParams } = new URL(request.url);
//   const filename = searchParams.get('filename');
 
//   const blob = await put(filename, request, {
//     access: 'public',
//   });
 
//   return NextResponse.json(blob);
// }