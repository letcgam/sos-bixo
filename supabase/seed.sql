INSERT INTO public.universidade (nome)
VALUES ('Fatec');

INSERT INTO public.campi (universidade_id, nome, cidade, estado, "endereço")
SELECT id, 'Fatec Campinas', 'Campinas', 'SP', 'Av. Cônego Antônio Roccato, 593 - Jardim Santa Monica, Campinas - SP, 13082-015'
FROM public.universidade
WHERE nome = 'Fatec';

INSERT INTO public.curso (camp_id, nome, sigla, descricao)
SELECT campi.id, cursos.nome, cursos.sigla, cursos.descricao
FROM public.campi AS campi
CROSS JOIN (VALUES
	('Análise e Desenvolvimento de Sistemas', 'ADS', 'Desenvolvimento de software, engenharia de sistemas e soluções tecnológicas inovadoras para o mercado global.'),
	('Gestão Empresarial', 'GE', 'Foco em estratégia, processos, pessoas e tomada de decisão para liderança em organizações modernas.'),
	('Gestão de Energia', 'GEEE', 'Especialização em eficiência energética, sustentabilidade e viabilidade técnica para o setor de energia.'),
	('Gestão da T.I.', 'GTI', 'Governança, infraestrutura e soluções digitais integradas ao negócio e à transformação tecnológica.'),
	('Processos Químicos', 'PQ', 'Otimização industrial, controle de qualidade e sustentabilidade aplicados à tecnologia química industrial.'),
	('Logística', 'LOG', 'Gestão estratégica de cadeias de suprimentos, transporte, armazenagem e operações globais.')
) AS cursos(nome, sigla, descricao)
WHERE campi.nome = 'Fatec Campinas';