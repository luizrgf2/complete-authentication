# SISTEMA DE AUTENTICAÇÃO USANDO TESTES E ARQUITETURA DE SOFTWARE

Antes de tudo quero destacar para quem estiver lendo isso, para não levar em consideração a simplicidade do projeto e sim as técnicas e tecnologias que foram empregadas, pois o objetivo desse projeto foi aplicar o conhecimento para a qualidade extrema de software, usando testes para evitar quaisquer bugs e eventualidades e usando arquitetura limpa pensando na escalabilidade e legibilidade do código. 

Esse projeto tem o objetivo de mostrar boas práticas de programação, dado que um dos maiores problemas que as empresas enfrentam é a dificuldade de manter o código, devido ao seu desenvolvimento sem visar testes ou arquitetura. Com isso, causando um alto acoplamento entre as camadas, além disso, a falta de testes pode causar bugs inesperados para seu software, fazendo com que o cliente final não tenha uma boa experiência de usuário, e isso pode acarretar a perda do mesmo, para outra solução do mercado.

Além da qualidade de software, também foi usado várias tecnologias que o mercado tem aderido atualmente. Coisas como prisma(ORM) para fazer o controle do banco de dados, typescript um superset de javascript para garantir um código mais tipado e seguro, jest um framework de testes para garantir a qualidade do projeto e muito mais.

## ARQUITETURA LIMPA

Para deixar mais claro, mas sem entrar em detalhes muito técnicos, eu irei mostrar em uma imagem a separação de responsabilidades criada por mim. 


![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.001.png)

**core:** A conhecida camada de domínio da arquitetura limpa, eu poderia até chamar as mesma de **domain,** porém o nome da pasta não importa para a implementação.

**data:** A camada da aplicação, responsável por orquestrar o que a camada de domínio implementou.

**infra:** O nome da pasta é bem sugestivo, é a camada que implementa todos os detalhes de infraestrutura que a camada da aplicação precisa para funcionar.

**presentation e main:** são as pastas onde tudo acontece, todas as lógicas e detalhes de infraestrutura se acoplam, é onde o input de dados acontece também.

Deixando bem claro, a explicação sobre as camadas da arquitetura limpa que fiz, é extremamente simplista e nem de longe representa o que realmente é, mas para abstrair a complexidade foi necessário simplificar.

## TESTES DE SOFTWARE

Uma coisa interessante de destacar é que a grande maioria dos programadores, utilizam solução com postman ou insomnia para fazer os testes nas rotas, isso é extremamente funcional, porém nada prático. Com isso, os testes de software se mostram mais seguros e mais rápidos para serem feitos, já que eles visam testar cada pedaço possível do projeto, garantindo assim, uma melhor confiabilidade e velocidade nos testes. E a melhor parte, é que uma vez os testes escritos, a cada deploy da aplicação é possível testar todas as etapas do software em alguns cliques, garantindo que nenhum bug suba para produção e mantendo a confiabilidade. No gif abaixo eu mostro todos os testes passando, testes verificando todas as etapas de um login, estampas como verificação de email, senha , email inexistente, senha errada e muito mais testes.

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.002.gif)



## COMO RODAR

**Passo 1**: é criar um .env derivado .env.example que existe no repositório com as seguintes variáveis de ambiente:





    DATABASE_URL="mysql://root:root@localhost:3305/auth"

    HTTP_PORT= porta do servidor

    JWT_KEY= chave de criptografia jwt

    SMTP_HOST= host do serviço de smtp

    SMTP_PORT= porta do serviço smtp

    SMTP_PASS= senha do serviço smtp

    SMTP_USER= usuário do  serviço smtp

    EMAIL_TO_SEND= email responsável por enviar o email para os usuários.



**Passo 2**: rode o comando **npm install**

**Passo 3:** rode seu banco de dados mysql na máquina ou use o docker-compose que está na pasta para usar o banco de dados em um container docker

**Passo 4**: rode o comando **npx prisma migrate dev**

**Passo 5:** rode os testes e veja se tudo está funcionando e conectado como deve ser **npm run test.**

**Passo 6:** rode **npm run dev,** isso irá rodar a aplicação em ambiente de desenvolvimento.


## ROTAS DA APLICAÇÃO

**POST /user/register** 
rota responsável por criar o usuário e enviar uma email de confirmação para o usuário.

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.003.png)

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.004.png)


**GET /user/confirm/:confirmToken**
rota responsável por confirmar o email do usuário.

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.005.png)

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.006.png)

**POST /user/auth**
rota responsável por fazer o login do usuário.

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.007.png)

![](documentation/images/Aspose.Words.142dadb0-7ca2-4f1c-af15-184101964861.008.png)
