"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Validate } from '@/components/Validate';
import { useAppContext } from '@/helpers/context';
import Menu from '@/components/Menu';

export default function Home() {
  const router = useRouter();

  const {data} = useAppContext()
  console.log(data)

  const redirectToAuth = () => {
    router.push('/auth'); // Ensure the route is correct
  };
  const redirectToToDo = () => {
    router.push('/todo'); // Ensure the route is correct
  };

  return (
    <div className="container">
      <Validate />
      <main className="my-5">
        {/* Next.js logo */}
        <h1>{data?.user?.name} <br/> Que gusto verte otra vez! </h1>

        
      </main>
      <Menu/>
    </div>
  );
}
