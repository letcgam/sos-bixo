import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { isStaffRole, type StaffRole } from '@/lib/auth';

export type ActiveAuthUser = {
    id: string;
    email: string;
    name: string;
    role: StaffRole;
    createdAt: string;
    lastSignInAt: string | null;
};

const USERS_PER_PAGE = 1000;

export async function listActiveAuthUsers(): Promise<{
    users: ActiveAuthUser[];
    error: string | null;
}> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey) {
        return {
            users: [],
            error: 'Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY no ambiente do servidor.',
        };
    }

    const supabase = createClient(supabaseUrl, secretKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    const users: ActiveAuthUser[] = [];

    for (let page = 1; ; page += 1) {
        const { data, error } = await supabase.auth.admin.listUsers({
            page,
            perPage: USERS_PER_PAGE,
        });

        if (error) {
            return {
                users: [],
                error: 'Não foi possível carregar as contas. Verifique a chave secreta do Supabase.',
            };
        }

        const now = Date.now();
        for (const user of data.users) {
            const role = user.app_metadata?.role;
            const isBanned = user.banned_until && Date.parse(user.banned_until) > now;

            if (!isStaffRole(role) || !user.email || !user.email_confirmed_at || user.deleted_at || isBanned) {
                continue;
            }

            const name = [user.user_metadata?.full_name, user.user_metadata?.name]
                .find((value): value is string => typeof value === 'string' && value.trim().length > 0)
                ?.trim() ?? '';

            users.push({
                id: user.id,
                email: user.email,
                name,
                role,
                createdAt: user.created_at,
                lastSignInAt: user.last_sign_in_at ?? null,
            });
        }

        if (data.users.length < USERS_PER_PAGE) {
            break;
        }
    }

    users.sort((first, second) => {
        const firstActivity = first.lastSignInAt ?? first.createdAt;
        const secondActivity = second.lastSignInAt ?? second.createdAt;
        return Date.parse(secondActivity) - Date.parse(firstActivity);
    });

    return { users, error: null };
}