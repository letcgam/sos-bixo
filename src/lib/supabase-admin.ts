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

export type StaffProfileSummary = {
    name: string;
    campus: {
        nome: string | null,
        cidade: string | null,
        estado: string | null,
        logoUrl: string | null,
        endereco: string | null
    },
    universidade: {
        nome: string | null,
        sigla: string | null,
        logoUrl: string | null
    }
};

const USERS_PER_PAGE = 1000;

function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey) return null;

    return createClient(supabaseUrl, secretKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

export async function getStaffProfileSummary(
    userId: string,
): Promise<StaffProfileSummary | null> {
    const supabase = createAdminClient();
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('perfil')
        .select(`
            nome,
            campus:campi!aluno_campi_id_fkey (
                nome,
                cidade,
                estado,
                endereço,
                logo_url,
                universidade:universidade!campi_universidade_id_fkey (
                    nome,
                    sigla,
                    logo_url
                )
            )
        `)
        .eq('id', userId)
        .maybeSingle();

    if (error || !data) return null;

    const campus = data.campus || null;
    const universidade = campus?.universidade || null;

    // return data;
    return {
        nome: data.nome,
        campus: campus
            ? {
                nome: campus.nome || null,
                cidade: campus.cidade || null,
                estado: campus.estado || null,
                logoUrl: campus.logo_url || null,
                endereco: campus.endereco || null
            }
            : null,
        universidade: universidade
            ? {
                nome: universidade.nome || null,
                sigla: universidade.sigla || null,
                logoUrl: universidade.logo_url || null
            }
            : null,
    };
}

export async function listActiveAuthUsers(): Promise<{
    users: ActiveAuthUser[];
    error: string | null;
}> {
    const supabase = createAdminClient();

    if (!supabase) {
        return {
            users: [],
            error: 'Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY no ambiente do servidor.',
        };
    }

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