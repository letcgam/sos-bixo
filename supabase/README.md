## Banco local (Supabase)

O banco local serve para desenvolver e testar sem alterar o banco publicado. É necessário ter o Docker Desktop instalado e aberto. Os comandos abaixo devem ser executados no terminal, na pasta principal do projeto.

O arquivo `supabase/seed.sql` contém apenas dados de exemplo locais. Para atualizar esses exemplos, edite esse arquivo; eles serão carregados novamente no próximo `db reset`. Para trazer alterações feitas no schema do projeto remoto, use `npx supabase db pull` e revise a migration criada. Esse comando traz a estrutura, não os dados das tabelas.

### Preparar para primeiro acesso

Este fluxo copia para sua máquina a estrutura do banco remoto (tabelas, colunas, tipos, índices e funções). Ele não copia os registros reais das tabelas, usuários do Auth ou arquivos do Storage.

1. Instale e inicie o Docker Desktop

	Espere até ele indicar que está em execução. Abra o terminal na pasta principal do projeto.

2. Vincule o CLI ao projeto remoto

	Faça login e informe o Project ID do Supabase:

	```bash
    npx supabase login
    npx supabase link --project-ref SEU_PROJECT_REF
	```

	Isso seleciona o projeto remoto que será consultado. Confira que é o projeto certo antes de continuar.

3. Traga o schema remoto

	```bash
    npx supabase db pull
	```

	O comando registra as diferenças do schema remoto em um arquivo SQL dentro de migrations. Revise esse arquivo e guarde-o no Git. Se não houver diferenças em relação às migrations existentes, talvez não crie uma nova.

4. Recrie o banco local a partir das migrations

	```bash
	// Caso o banco ainda não tenha sido iniciado:
	npx supabase start
	// Caso o banco já tenha sido iniciado:
    npx supabase db reset
	```

	Isso apaga e recria somente o banco local, aplica todas as migrations em ordem e executa seed.sql. Não apaga nem altera o banco remoto.

5. Acesse e configure o aplicativo; Rode:

	```bash
    npx supabase status
	```

	Coloque em `.env.local` a URL e a chave pública locais (anon key) exibidas por supabase status e reinicie npm run dev.
   	Abra o Supabase Studio local em [http://127.0.0.1:54323](http://127.0.0.1:54323). Use Table Editor para ver as tabelas e SQL Editor para executar consultas.

### Atualizar o banco local a partir do remoto

	Para o primeiro acesso ao repositório, a boa prática é apenas subir os containers (`npx supabase start`), rodar as migrations existentes com npx `supabase db reset` e carregar o seed.sql. O db pull só deve ser usado quando alterações foram feitas diretamente via dashboard do Supabase Web e precisam ser trazidas de volta para o código.

1. Puxe as alterações remotas com:

	```bash
    npx supabase link --project-ref SEU_PROJECT_REF
    npx supabase db pull
	```

2. Teste a alteração localmente com `npx supabase db reset`. Esse comando recria o banco local; dados criados manualmente nele serão apagados e o seed será executado novamente.

### Atualizar o banco remoto a partir do local

1. Se as alterações foram feitas no banco local, gere uma migration com as diferenças com:

    ```bash
    npx supabase db diff -f nome_da_migration
	```

	Se preferir escrever manualmente as alterações a serem aplicadas, use:

    ```bash
    npx supabase migration new nome_da_migration
	```

2. Para aplicar no Supabase remoto, primeiro confira se as alterações estão salvas como arquivos SQL em migrations. Depois, na raiz do projeto:

    ```bash
	npx supabase migration list
	npx supabase db push --dry-run
	```

3. Confira se o projeto vinculado é o de produção e se o preview mostra as migrations esperadas. Então aplique:

	```bash
	npx supabase db push
	```

	`db push` envia migrations pendentes, mas não envia os dados de `seed.sql`. Não use `db push` para um banco remoto sem revisar as migrations primeiro.
