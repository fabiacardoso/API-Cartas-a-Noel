# API Cartas a Noel

## Projeto Final {reprograma} - BackEnd

# **PROBLEMA**

### Qual o problema que eu quero resolver?

Todos os anos, no natal, muitas crianças brasileiras escrevem cartas endereçadas ao Papai Noel. Estas cartas são entregues aos Correios que separam as cartas por tema do pedido e as deixam disponíveis para que pessoas que desejam realizar o desejo de uma dessas crianças. No último natal o Correio precisou mudar a estratégia de recebimento das cartas e também a forma como elas ficam disponíveis por conta da pandemia de Covid19. Foi criado um blog onde as crianças e seu responsáveis podem fazer o upload da sua carta, que deve ser escrita e digitalizada/fotografada. Depois elas são separadas por tema e suas imagens são expostas para que sejam adotadas. 

Assim surge o problema! O processo, mesmo ganhando o mundo digital, continua trabalhoso e manual. Como os textos das cartas estão em formato imagem e não texto, não é possível automatizar os processos de buscar por tema, cidade, estado etc. Busca que é extremamente necessária para quem deseja ajudar.  

### Número que comprovem que o seu problema

Em 2020, os Correios recebem de 70 mil cartas no período do natal. 

### Quem sofre com esse problema? (gênero, classe social, renda, cor)

São crianças carentes de todo o Brasil.

Mais de 20% da população vive em situação de insegurança alimentar, segundo o IBGE.
Essas pessoas tem dificuldade de comprar até mesmo o que deveria ser básico. 

Temos hoje em nosso país quase 40 milhões de pessoas em situação de miséria. De acordo com dados do Ministério da Cidadania, são cidadãos com renda mensal per capita de até R$ 89,00. 

### Como eles estão resolvendo o seu problema hoje?

Existem sistemas de gerenciamento de textos acadêmicos que auxiliam na construção e organização de pré-projetos e projetos.  

### Como posso resolver isso com tech?

Para solucionar esta questão temos a API Cartas a Noel, através dela será possível que os pais e as crianças possam cadastrar seus textos de suas cartas, seus dados de contato e o nome do item de desejo.

Assim será possível que os doadores entrem e pesquisem os desejos de acordo com o que elas podem ou desejam doar. E a equipe dos Correio não precisará mais fazer a separação manual das cartas.

### Qual o mínimo que posso entregar? (MVP - mínimo produto viável)

Inicialmente, nesta versão, foi entregue a funcionalidade de cadastrar as cartas com o texto dela e os dados pessoais da criança como nome, contato, cidade, estado e o nome/titulo do presente que deseja ganhar.

# **SOLUÇÃO**

### Defina em uma frase sua solução

A  é uma API para cadastro de cartas para o Papai Noel dos Correios.

### Qual a diferença entre a minha solução e o que já existe?

Esta API tem o objetivo de ser simples de usar, gratuita e acessível para que o sistema de separação e seleção das cartas seja mais fácil e mais rápido.

### A minha solução é melhor do que a que já existe?

Sim, porque a atual não automatiza os processos.  

## Features

- Cadastrar uma carta
    - Cadastrar uma carta através

- Pesquisa todas as cartas por nome/titulo do presente
    - Pesquisar uma carta através d

- Deletar uma carta
    - Remover/Apagar uma ficha através d

[BackEnd Requirements](https://www.notion.so/82bf6a1fe215482cabed64e09d410b06)

## Mínimo técnico

- [x]  CRUD
- [x]  MONGO

### Instalação

Essa API foi desenvolvida em Node.js, com utilização do banco de dados MongoDB.

1. Clonar o projeto
    - npm install
    - npm install -D nodemon
    - npm install mongoose
2. Abrir a pasta pelo prompt de comando
3. Instalar as dependências e bibliotecas
    - nodemon server.js

## **Implementações futuras**

- Criação do FrontEnd
