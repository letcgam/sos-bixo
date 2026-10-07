import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import { Logo } from './components/logo';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-foreground">
            <Logo isSquare={true} />
            <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-neutral-950"
            >
                Fazer login
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
        </main>
    );
}