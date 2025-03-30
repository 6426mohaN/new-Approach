import Logo404 from '@/components/Logo404';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col gap-y-5 items-center justify-center bg-slate-900'>
       <Logo404 />

      {/* <Link href="/">
        <Button>Go Home</Button>
      </Link> */}
      <Link href="/">
        <button
         type="button"
         
         className="mt-4 bg-pink-500 px-4 py-2 rounded-lg text-white">Back to homepage</button>
     
      </Link>
    </div>
  );
}
