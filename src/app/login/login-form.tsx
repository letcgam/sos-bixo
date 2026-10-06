'use client';

import { useActionState } from 'react';
import { ArrowRight, Key, Mail } from 'lucide-react';
import { signInAction } from '@/app/actions/auth';
import { Button } from '@/app/components/button';
import { Input } from '@/app/components/input';

export function LoginForm() {
    const [state, action, pending] = useActionState(signInAction, null);

    return (
        <form action={action} className="mt-5 space-y-3">
            <Input
                label="E-mail"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="nome@exemplo.com"
                icon={Mail}
                required
            />
            <Input
                label="Senha"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Sua senha"
                icon={Key}
                required
            />

            {state?.error && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
                    {state.error}
                </p>
            )}

            <Button
                // type="submit"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                disabled={pending}
                className="w-full mt-8"
            >
                {pending ? 'Verificando...' : 'Entrar'}
            </Button>
        </form>
    );
}