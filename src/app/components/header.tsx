import { cookies } from 'next/headers';
import { Button } from '@/app/components/button';
import { Logo } from '@/app/components/logo';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { ArrowRight } from 'lucide-react';
import { isStaffRole } from '@/lib/auth';

export default async function Header() {
    const supabase = createClient(await cookies());
    const { data: { user } } = await supabase.auth.getUser();
    const isStaff = isStaffRole(user?.app_metadata?.role);

    return (
        <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div>
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                </div>
                {isStaff ? (
                    <Link href="/painel">
                        <Button size="sm" variant="outline" icon={ArrowRight}>Minha conta</Button>
                    </Link>
                ) : (
                    <Link href="/login">
                        <Button size="sm" variant="primary" icon={ArrowRight}>Login</Button>
                    </Link>
                )}
            </div>
        </header>
    );
}
