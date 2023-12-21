'use client';

import { useState, useRef, FormEventHandler } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';

export default function Form() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  async function attachAvatar(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (!inputFileRef.current?.files) {
        throw new Error('No file selected');
      }

      const file = inputFileRef.current.files[0];

      const formData = new FormData();
      formData.set("filename", file.name);
      formData.set("file", file);

      const response = await fetch('/api/avatar/upload', {
        method: "POST",
        body: formData,
      });
      
      const newBlob = (await response.json()) as PutBlobResult;

      setBlob(newBlob);
  }

  return (
    <div className="flex">
      <form action={createCustomer}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="email"
                  type="text"
                  placeholder="email"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Upload Avatar
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="avatar"
                  name="image_url"
                  type="text"
                  placeholder="image url"
                  defaultValue={blob && blob.url || ''}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/customers"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Customer</Button>
        </div>
      </form>
      <form
        onSubmit={(e) => attachAvatar(e)}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
