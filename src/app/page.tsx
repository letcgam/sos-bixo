import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">SOS Bixo - Teste Supabase</h1>

      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          ❌ Erro ao conectar com o Supabase: {error.message}
        </div>
      ) : (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          ✅ Conexão com o Supabase estabelecida com sucesso!
        </div>
      )}
    </main>
  );
}