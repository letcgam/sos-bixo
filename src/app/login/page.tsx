import { LoginForm } from './login-form';
import { Logo } from '../components/logo';
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react';

type LoginPageProps = {
    searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { error } = await searchParams;

    return (
        <main className="flex flex-col min-h-screen items-center justify-center bg-neutral-50 px-5 py-12 text-neutral-900 dark:bg-neutral-950 dark:text-slate-100">
            <section className="w-full max-w-md rounded-2xl bg-white p-7 shadow-sm dark:bg-neutral-800 sm:p-9">
                <div className="flex flex-col items-center mb-5">
                    <Logo />
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-400">Acesso da equipe</p>
                </div>
                <p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-400">
                    Entre com sua conta autorizada de administrador ou moderador.
                </p>

                {error === 'unauthorized' && (
                    <p role="alert" className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                        Sua conta não possui uma função de equipe autorizada.
                    </p>
                )}

                <LoginForm />
            </section>

            <Link href="/" className="underline flex items-center gap-2 mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                <ArrowLeft /> Página inicial
            </Link>
        </main>
    );
}