"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const redirectToAuth = () => {
    router.push('/auth'); // Ensure the route is correct
  };

  return (
      <div className="container">
        <main className="my-5">
          {/* Next.js logo */}
          <Image
              className="mb-4"
              src="https://nextjs.org/icons/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
          />
          {/* Additional content */}
          <div className="mt-4">
            <a
                className="btn btn-link"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Image
                  className="me-2"
                  src="https://nextjs.org/icons/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
              />
            </a>
          </div>
        </main>

        {/* Authentication Button */}
        <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              redirectToAuth();
            }}
        >
          Go to Authentication
        </button>

        {/* Link to Pomodoro Timer in Footer */}
        <Link href="/pomodoro" className="btn btn-primary ms-3">
          Pomodoro Timer
        </Link>

        <footer className="d-flex justify-content-between align-items-center py-3 my-4 border-top">

          <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="ms-3"
          >
            <Image
                aria-hidden
                src="https://nextjs.org/icons/file.svg"
                alt="File icon"
                width={16}
                height={16}
            />
            Learn
          </a>
          <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="ms-3"
          >
            <Image
                aria-hidden
                src="https://nextjs.org/icons/window.svg"
                alt="Window icon"
                width={16}
                height={16}
            />
            Examples
          </a>
          <a
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="ms-3"
          >
            <Image
                aria-hidden
                src="https://nextjs.org/icons/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
  );
}
