"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Logged to the browser console only; no personal data is involved.
    console.error(error.digest ?? error.message);
  }, [error]);

  return (
    <Container className="max-w-2xl py-24 text-center sm:py-32">
      <h1 className="text-3xl font-bold sm:text-4xl">Something went wrong</h1>
      <p className="mt-4 text-lg text-slate-700">Please try again. If the problem continues, call us on {site.phone.display}.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className={buttonClasses("primary")}>
          Try again
        </button>
        <Link href="/" className={buttonClasses("secondary")}>
          Home page
        </Link>
      </div>
    </Container>
  );
}
