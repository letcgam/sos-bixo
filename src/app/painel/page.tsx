import { LogOut } from 'lucide-react';
import { signOutAction } from '@/app/actions/auth';
import { Button } from '@/app/components/button';
import { Logo } from '@/app/components/logo';
import { requireStaff } from '@/lib/auth';

export default async function PanelPage() {
    const staff = await requireStaff();
    const roleLabel = staff.role === 'admin' ? 'Administrador' : 'Moderador';

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-slate-100">
            <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <Logo />
                            <p className="text-xs text-slate-500 dark:text-slate-400">Painel da equipe</p>
                        </div>
                    </div>
                    <form action={signOutAction}>
                        <Button type="submit" variant="outline" size="sm" icon={LogOut}>
                            Sair
                        </Button>
                    </form>
                </div>
            </header>

            <section className="mx-auto max-w-5xl px-5 py-12">
                <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{roleLabel}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Bem-vindo ao painel</h1>
                <p className="mt-3 text-slate-600 dark:text-slate-400">Sessão iniciada como {staff.email}.</p>
            </section>
        </main>
    );
}