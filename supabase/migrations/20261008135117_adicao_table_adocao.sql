CREATE TABLE "public"."adocao" (
  "id"                   uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "calouro_id"           integer                  NOT NULL,
  "veterano_id"          integer                  NOT NULL,
  "mensagem_solicitacao" text,
  "criado_em"            timestamp with time zone DEFAULT now(),
  "atualizado_em"        timestamp with time zone DEFAULT now(),
  CONSTRAINT "adocao_pkey" PRIMARY KEY (id),
  CONSTRAINT "check_calouro_diferente_veterano" CHECK ((calouro_id <> veterano_id)),
  CONSTRAINT "unique_calouro_ativo" UNIQUE (calouro_id)
);

ALTER TABLE "public"."adocao"
  ENABLE ROW LEVEL SECURITY;

CREATE TYPE "public"."status_adocao" AS ENUM (
  'pendente',
  'aceito',
  'recusado',
  'finalizado'
);

ALTER TABLE "public"."adocao"
  ADD COLUMN "status" public.status_adocao NOT NULL DEFAULT 'pendente'::public.status_adocao;

ALTER TABLE "public"."adocao"
  ADD CONSTRAINT "adocao_calouro_id_fkey" FOREIGN KEY (calouro_id) REFERENCES public.aluno(id) ON DELETE RESTRICT;

ALTER TABLE "public"."adocao"
  ADD CONSTRAINT "adocao_veterano_id_fkey" FOREIGN KEY (veterano_id) REFERENCES public.aluno(id) ON DELETE RESTRICT;

CREATE INDEX idx_adocao_calouro ON public.adocao USING btree (calouro_id);

CREATE INDEX idx_adocao_veterano ON public.adocao USING btree (veterano_id);

COMMENT ON TABLE "public"."adocao" IS 'Adoção de um calouro por parte de um veterano';

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."adocao" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."adocao" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."adocao" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."adocao" TO "service_role";
