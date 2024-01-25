create database dindin;

create table usuarios (
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table categorias (
	id serial primary key,
  descricao text not null
);

create table transacoes (
	id serial primary key,
  descricao text not null,
	valor integer not null,
  data timestamp default now(),
  categoria_id integer references categorias(id),
  usuario_id integer references usuarios(id),
  tipo text not null
);

insert into categorias (descricao) values
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');

insert into transacoes (tipo, descricao, valor, usuario_id, categoria_id)
values
('saida','Sapato amarelo', 15800, 1, 4),
('entrada', 'Salário', 300000, 1, 6);
