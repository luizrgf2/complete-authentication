
<h1 style="text-align:center;">SISTEMA DE AUTENTICAÇÃO USANDO TESTES E ARQUITETURA DE SOFTWARE</h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/luizrgf2/complete-authentication/blob/main/LICENSE)




## SOBRE O PROJETO
Antes de tudo, quero destacar para quem estiver lendo que não devem levar em consideração a simplicidade do projeto, mas sim as técnicas e tecnologias que foram empregadas. O objetivo deste projeto foi aplicar o conhecimento para garantir a qualidade extrema do software, utilizando testes para evitar qualquer tipo de bug ou eventualidade, e aplicando uma arquitetura limpa que visa a escalabilidade e legibilidade do código.

Este projeto tem como propósito demonstrar boas práticas de programação, uma vez que uma das maiores dificuldades enfrentadas pelas empresas é a manutenção do código, devido ao desenvolvimento sem a devida atenção aos testes e à arquitetura. Isso resulta em alto acoplamento entre as camadas e, além disso, a ausência de testes pode causar bugs inesperados no software, prejudicando a experiência do usuário e levando a perda do cliente para outras soluções do mercado.


### **ARQUITETURA LIMPA**

Para deixar mais claro, sem entrar em detalhes muito técnicos, mostrarei em uma imagem a separação de responsabilidades criada por mim.


![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.001.png)

**core:** 
A conhecida camada de domínio na arquitetura limpa, também pode ser chamada de **domain**, embora o nome da pasta não seja relevante para a implementação.

**data:**
A camada da aplicação é responsável por orquestrar e coordenar a implementação da camada de domínio.

**infra:** O nome da pasta "infra" é bem sugestivo, pois representa a camada responsável por implementar todos os detalhes de infraestrutura necessários para o funcionamento da camada de aplicação.

**presentation e main:** sAs pastas "presentation" e "main" são onde ocorrem todas as lógicas e detalhes de infraestrutura, onde os diferentes componentes se acoplam. Além disso, é nessa camada que ocorre o input de dados.

Devo ressaltar que a explicação que forneci sobre as camadas da arquitetura limpa é extremamente simplificada e não representa completamente a complexidade envolvida. No entanto, essa simplificação foi necessária para facilitar a compreensão dos conceitos-chave. A arquitetura limpa é um tópico abrangente e detalhado, e há muito mais a ser explorado além do que foi mencionado aqui.

### **TESTES DE SOFTWARE**

Uma coisa interessante de destacar é que a grande maioria dos programadores utiliza soluções como Postman ou Insomnia para fazer os testes nas rotas. Isso é extremamente funcional, porém nada prático. Nesse sentido, os testes de software se mostram mais seguros e mais rápidos para serem feitos, uma vez que visam testar cada pedaço possível do projeto, garantindo assim uma melhor confiabilidade e velocidade nos testes. A melhor parte é que, uma vez que os testes estão escritos, a cada deploy da aplicação é possível testar todas as etapas do software em alguns cliques, garantindo que nenhum bug suba para produção e mantendo a confiabilidade. No gif abaixo, mostro todos os testes passando, incluindo testes que verificam todas as etapas de um login, como a verificação de email, senha, email inexistente, senha errada e muito mais.

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.002.gif)


## TECNOLOGIAS USADAS

* mysql
* prisma
* nodemailer
* expressjs
* jest
* eslint
* git
* jsonWebToken(JWT)
* bcrypt
* typescript

## TÉCNICAS USADAS 

* padrões de projeto
    
        repository
        factory
        injeção de dependência
* solid
* código limpo
* arquitetura limpa
* testes unitários
* testes de integração

## COMO RODAR

**Passo 1**: é criar um .env derivado .env.example que existe no repositório com as seguintes variáveis de ambiente:



```bash

    DATABASE_URL="mysql://root:root@localhost:3305/auth"
    HTTP_PORT= porta do servidor
    JWT_KEY= chave de criptografia jwt
    SMTP_HOST= host do serviço de smtp
    SMTP_PORT= porta do serviço smtp
    SMTP_PASS= senha do serviço smtp
    SMTP_USER= usuário do  serviço smtp
    EMAIL_TO_SEND= email responsável por enviar o email para os usuários.

```

**Passo 2**: rode o comando:
    
    npm install

**Passo 3:** rode seu banco de dados mysql na máquina ou use o docker-compose que está na pasta para usar o banco de dados em um container docker

**Passo 4**: rode o comando :
    
    npx prisma migrate dev

**Passo 5:** rode os testes e veja se tudo está funcionando e conectado como deve ser: 
 
    npm run test

**Passo 6:** para rodar a aplicação em ambiênte de desenvolvimento:

    npm run dev


## ROTAS DA APLICAÇÃO

**POST** /user/register
        
    rota responsável por criar o usuário e enviar uma email de confirmação para o usuário.

*Request body*:

```json
{
    "email":"teste2@gmail.com",
    "password":"Test12345",
    "name":"Rogerio Felipe"
}
```
Response body:

```json
{
	"id": "74178016-8de4-426f-9732-1d68c5d097a7",
	"createdAt": "2023-05-14T00:13:41.178Z",
	"updatedAt": "2023-05-14T00:13:41.178Z",
	"name": "Rogerio Felipe",
	"email": "teste2@gmail.com",
	"password": ""
}
```


**GET** /user/confirm/:confirmToken
        
    rota responsável por confirmar o email do usuário.



**POST** /user/auth

    rota responsável por fazer o login do usuário.


Request body:
```json
{
	"email":"teste2@gmail.com",
	"password":"Test12345"
}
```

Response body:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.             eyJpZCI6Ijc0MTc4MDE2LThkZTQtNDI2Zi05NzMyLTFkNjhjNWQwOTdhNyIsImlhdCI6MTY4NDAyMzg4NSwiZXhwIjoxNjg0MTEwMjg1fQ.t2Ehyjp7AwE6aAwsOaK0HGGfx86ort4Mm8CV2WAa07Q",
	"user": {
		"id": "74178016-8de4-426f-9732-1d68c5d097a7",
		"createdAt": "2023-05-14T00:13:41.178Z",
		"updatedAt": "2023-05-14T00:19:28.762Z",
		"name": "Rogerio Felipe",
		"accountConfirmed": true,
		"email": "teste2@gmail.com",
		"password": ""
	}
}
```
