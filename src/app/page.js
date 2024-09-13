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
              src="/logo.png"
              alt="ToDoTec logo"
              width={180}
              height={180}
              priority
          />

          {/* Additional content */}
          <div className="mt-4">
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
        <footer className="d-flex justify-content-between align-items-center py-3 my-4 border-top">

        </footer>
      </div>
  );
}
