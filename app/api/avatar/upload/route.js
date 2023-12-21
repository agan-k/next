import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  const body = await request.formData();
  const filename = body.get("filename");
  const file = body.get("file");

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });
 
  return NextResponse.json(blob);
}