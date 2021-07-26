# API Cartas a Noel - Projeto Final {reprograma} - BackEnd

<img src="/imgReadme/capa-readme-logo.png">

### Qual o problema que eu quero resolver?

Todos os anos, no natal, muitas crianças brasileiras escrevem cartas endereçadas ao Papai Noel. Estas cartas são entregues aos Correios que separam as cartas por tema do pedido e as deixam disponíveis para que pessoas que desejam realizar o desejo de uma dessas crianças. Segundo os Correios, em 2020, os Correios recebem de 70 mil cartas no período do natal. 

No último natal o Correio precisou mudar a estratégia de recebimento das cartas e também a forma como elas ficam disponíveis por conta da pandemia de Covid19. Foi criado um blog onde as crianças e seu responsáveis podem fazer o upload da sua carta, que deve ser escrita e digitalizada/fotografada. Depois elas são separadas por tema e suas imagens são expostas para que sejam adotadas. 

Assim surge o problema! O processo, mesmo ganhando o mundo digital, continua trabalhoso e manual. Como os textos das cartas estão em formato imagem e não texto, não é possível automatizar os processos de buscar por tema, cidade, estado etc. Busca que é extremamente necessária para quem deseja ajudar. 

### A Solução

Para solucionar esta questão temos a API Cartas a Noel, através dela será possível que os pais e as crianças possam cadastrar seus textos de suas cartas, seus dados de contato e o nome do item de desejo. Assim será possível que os doadores entrem e pesquisem os desejos de acordo com o que elas podem ou desejam doar. E a equipe dos Correio não precisará mais fazer a separação manual das cartas.

### Qual o mínimo que posso entregar? (MVP - mínimo produto viável)

Inicialmente, nesta versão, foi entregue a funcionalidade de cadastrar as cartas com o texto dela e os dados pessoais da criança como nome, contato, cidade, estado, o desejo e o textos da carta falando um pouco sobre o presente que deseja ganhar.
<br>
<br>

<!-- ## Features

- Cadastrar uma carta

- Pesquisa todas as cartas por nome, cidade, estado e desejo
 
- Deletar uma carta

- Atualizar uma carta -->

## Tecnologias usadas:

- [x]  CRUD
- [x]  MONGO
- [x]  Node.js
- [x]  JavaScrip
- [x]  MongoDB
- [ ]  Heroku
<br>
<br>

## Tabela letters

```

    {
        "_id": "7706273476706534553",
        "name": "Ana Paula",
        "city": "Camaçari",
        "state": "Bahia",
        "desire": "Bicicleta",
        "whatsapp": "71 99999999",
        "letter": "Querido Papai Noel, gostaria de te pedir...",
    }

```

## Tabela letterUser

```
{
    "id": "401465483996",
    "email": "anamaria@gmail.com",
    "passwd":"mypassword"
}
```

<br>
<br>

# Métodos e Rotas da API

## /GET

| Verbo        | Recurso             | Descrição                          | OBS:                              |
| ------------ | --------------------| -----------------------------------|-----------------------------------|
| GET          | `/letters`            | Retornar todas cartas cadastradas. | Pode ser feita por desire, state, city ou name.
| GET          | `/latters?desire=Bicicleta`  | Retornar todas cartas com pedido de Bicicleta. |
| GET          | `/latters?desire=Bicicleta&city=Camacari`  | Retornar todas cartas com pedido de Bicicleta na cidade de Camaçari, por exemplo. |
| GET          | `/latters?name=Ana`  | Retornar todas cartas com nome Ana. |


retorna um Json:

```
[
    {
        "_id": "5fb92d939dc32ab27c75f528",
        "name": "Ana Paula",
        "city": "Camaçari",
        "state": "Bahia",
        "desire": "Bicicleta",
        "whatsapp": "71 99999999",
        "letter": "Querido Papai Noel, gostaria de te pedir...",
    },
    {
        "_id": "5fb92e7e9dc32ab27c75f529",
        "name": "Ana Maria",
        "city": "Camaçari",
        "state": "Bahia",
        "desire": "Camaçari",
        "whatsapp": "71 99999999",
        "letter": "Querido Papai Noel, gostaria de te pedir...",
    }
]
```
<br>
<br>

# Authorization

Nas rotas autorizadas ("Authorization") necessário colocar o Bearer e o token que será gerado quando for feito o login. O PUT, DELETE e o POST são rotas que necessitarão de autorização para serem manipuladas.
<br>
<br>


## /POST
Para cadastrar uma carta você precisará de autorização. O parâmetro "Authorization" do header precisa estar preenchido.

| Verbo        | Recurso             | Descrição                          | 
| ------------ | --------------------| -----------------------------------|
| POST        | `/letter`            | Cadastrar uma carta. | 

### body

```
    {
        "name": "Ana Maria",
        "city": "Camaçari",
        "state": "Bahia",
        "desire": "Camaçari",
        "whatsapp": "71 99999999",
        "letter": "Querido Papai Noel, gostaria de te pedir...",
    }

```
### response: 201: a carta foi criada:

```
    {
        "name": "Ana Maria",
        "city": "Camaçari",
        "state": "Bahia",
        "desire": "Camaçari",
        "whatsapp": "71 99999999",
        "letter": "Querido Papai Noel, gostaria de te pedir...",
    }

```
### 500: Authorization header missing

<br>
<br>

## /DELETE 
Para deletar uma carta cadastrada, será necessário uma autorização. O parâmetro "Authorization" do header precisa estar preenchido. Através do ID deletaremos a carta desejada.

### 500 : mensagem: "FALHOU"

### 200: "Registro alterado com sucesso!"

### 200 (se não houver a banda): "Não há registro para atualizar com este id."

| Verbo        | Recurso             | Descrição                          | 
| ------------ | --------------------| -----------------------------------|
| DELETE         | `/:id`            | Deletar uma carta a partir do ID. | 

<br>
<br>

## /PUT
Para atualizar uma carta cadastrada você precisará de uma autorização. O parâmetro "Authorization" do header precisa estar preenchido.

Através do ID iremos pegar a carta para atualizar o que queremos. No body passaremos os pontos que serão atualizados.

| Verbo        | Recurso             | Descrição                          | 
| ------------ | --------------------| -----------------------------------|
| PUT          | `/:id`            | Atualizar uma carta a partir do ID. | 


### body

```
{
    "name":"Ana Paula",
    "city": "Camacari/BA"

}

```

<br>
<br>

# Cadastro e Login

Foi criado um signup e um login para o usuário acessar a conta. Assim é criado um código de autorização para o usário registrar, deletar ou modificar o registro.


## /POST
Usuário e senha será passado para entrar na conta da carta.

| Verbo        | Recurso             | Descrição                          | 
| ------------ | --------------------| -----------------------------------|
| POST          | `/login`            | Logar usuário. | 
| POST          | `/signup`  | Cadastrar um novo usuário. |



### body

```
{
    "email": "anamaria@gmail.com",
    "passwd":"mypassword"
}

```

## **Implementações futuras**

- Desenvolvimento do Front
- Criação de um aplicativo mobile

<br>
<br>

## Proposta para o Frontend

<img src="/imgReadme/Tela-Home.png">
<img src="/imgReadme/Tela-Cadastre.png">
<img src="/imgReadme/Tela-Adote.png">



[![reprograma](https://user-images.githubusercontent.com/34174851/101967678-44f98c80-3bfa-11eb-9a5b-187ec3245814.jpg)](https://github.com/reprograma/)

<!-- <img src="/imgReadme/img-capa-readme.png"> -->
