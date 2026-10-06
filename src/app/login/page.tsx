import { ShieldUser } from 'lucide-react';
import { LoginForm } from './login-form';

type LoginPageProps = {
    searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { error } = await searchParams;

    return (
        <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-5 py-12 text-neutral-900 dark:bg-neutral-950 dark:text-slate-100">
            <section className="w-full max-w-md rounded-2xl bg-white p-7 shadow-sm dark:bg-neutral-800 sm:p-9">
                <div>
                    <ShieldUser aria-hidden="true" className="h-6 w-6" />
                </div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">SOS Bixos</h1>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-400">Acesso da equipe</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    Entre com sua conta autorizada de administrador ou moderador.
                </p>

                {error === 'unauthorized' && (
                    <p role="alert" className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                        Sua conta não possui uma função de equipe autorizada.
                    </p>
                )}

                <LoginForm />
            </section>
        </main>
    );
}