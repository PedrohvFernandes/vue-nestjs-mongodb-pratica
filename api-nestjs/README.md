# NestJs + TypeScript + PrismaOrm + MongoDB - Um framework totalmente verboso, opinativo, modular

## Alguns videos/docs que me ajudaram

- [Docs NestJs](https://docs.nestjs.com/first-steps)
- [NestJS em 15 minutos, direto ao ponto!](https://www.youtube.com/watch?v=MDkpX6jBCEo)
- [EP01 - Introdução ao NestJs | NestJS na Prática](https://www.youtube.com/watch?app=desktop&v=ju983eSUw-8&sttick=0)
- [Crud completo com NestJS e MongoDB - NestJS para Iniciantes](https://www.youtube.com/watch?v=6mXi2RY5Wtw&sttick=0)
- [Pipes](https://docs.nestjs.com/pipes)
  - [Validation](https://docs.nestjs.com/techniques/validation)
  - ```npm i class-validator class-transformer``` para fazer a validação dos dados 
### Envs no nestJs
  -[Configurações e Variáveis de Ambiente .env com NestJS #nodejs #javascript #typescript #backend](https://www.youtube.com/watch?v=U0F4_NEkZ3k)
    - Aqui usamos a lib: ```npm i @nestjs/config```
      - Junto com ela usamos a lib: ```npm i joi```  para fazer a validação das envs, tipo o zod
      - Para tipar as envs, criamos um arquivo de config
    - Fazemos um arquivo de config
    - Tipamos as envs
       - Tipo no node normal: [Lendo e validando variáveis ambiente no JavaScript](https://www.youtube.com/watch?v=n6u1eTrHxfs) ou no projeto front-end aqui desse repo
    - [Docs configuration](https://docs.nestjs.com/techniques/configuration)
    - Comandos do nest:
      - ```nest g module nomeDoModule``` para criar um module, ele já coloca o modulo nomeDoModule.module.ts no app.module.ts
      - ```nest g controller nomeDoController``` para criar um controller, ele já coloca o controller nomeDoController.controller.ts no app.module.ts. Ex: ```nest generate controller auth --flat``` para não criar uma pasta auth
  -[Setting Up Environment Variables and Configurations in NestJS](https://bhargavacharyb.medium.com/setting-up-environment-variables-and-configurations-in-nestjs-a6372fb81f31)
    - Aqui usamos a lib: ```npm install --save dotenv```
      - Importamos no main.ts e com isso toda a aplicação tem acesso as variáveis de ambiente


## Extensões

### Nome: REST Client para usar os métodos HTTP nos arquivos .http
{
  ID: humao.rest-client
  Descrição: REST Client for Visual Studio Code
  Versão: 0.25.1
  Editor: Huachao Mao
  Link do Marketplace do VS: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
}

## Sequencia de instalação

### Config

- npm i -g @nestjs/cli   
  - nest new api-nestjs      
    - ```npm i``` para instalar as dependências
    - Exclua arquivos desnecessários

- ```npm run start:dev``` para iniciar o servidor


- Crie mappings para os arquivos do vue
  - Crie ```tsconfig.paths.json```
  - Depois em ```tsconfig.json``` coloque: 
  ```Json
      "extends": "./tsconfig.paths.json"
  ```

- Configurando o eslint V8(V9 ta diferente e estranho). Pode copiar o arquivo eslint para vue para o seu projeto, como está aqui na pasta raiz.
  - Lembre de copiar e usar o .vscode daqui da pasta, para o Eslint funcionar
  - [No fim eu fiz um pacote npm da minha config eslint](https://www.npmjs.com/package/@pedrohvfernandes/eslint-config-nestjs). Basicamente eu faço a config do eslint antes em algum projeto vue/react, vejo se esta corrigindo os erros(fiz isso para o react, next e node também), e depois eu crio um pacote com essas configs, para depois no projeto que foi criado a config eslint enorme so extender essas configs no arquivo .eslintrc.json, que antes era um .eslintrc.cjs com as configs, agora nada mais é que um JSON estendendo o meu arquivo vue.js do meu pacote ```npm i @pedrohvfernandes/eslint-config-nestjs``` que era .eslintrc.cjs 

  - Agora instale: ```npm i husky git-commit-msg-linter -D``` na raiz do projeto. Primeiro porque o husky precisa ter acesso ao .git do projeto, ou seja, so na raiz do projeto temos acesso ao .git onde fica os hooks. Então pode ser aqui na web-vue e nem na pasta de api. E o git-commit-msg-linter porque iremos fazer commit pelo terminal da raiz

  - Depois instale nesse projeto do front: ``` npm i lintstagedrc -D``` e crie o arquivo ```lintstagedrc.json```
    - E coloque o comando para rodar no momento de commit, push... (Tudo vai depender do que você colocar no arquivo e de quando rodar no Husky(commit...))

## Links que me ajudaram

- [Nestjs e MongoDB](https://chatgpt.com/c/670f718a-e64c-8010-8abc-c4ac966718d9) --> Perguntei pro chatgpt como conectar no mongodb e foi como descrito na documentação do prisma e do atlas, ele gerou o link certinho para conectar no banco de dados(o mesmo link que aparece quando clicamos em connect)
 - [MongoDB in prisma](https://www.prisma.io/docs/orm/overview/databases/mongodb)
 - [mongodb-atlas-setup prisma](https://www.prisma.io/dataguide/mongodb/mongodb-atlas-setup)
  - [Database Access username e senha do bd para ter acesso no atlas](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/security/database)
    - Se esquece a senha do usuario admin, resetar a senha:
    - Edit
      - Edit password
       - Auto generate secure password
        - Update User
    - basta criar um novo usuario não com a role admin
      - Add new database user
        - Username
        - Password
        - Role(pode ser admin, mas não é recomendado)
        - Add User
    - Esse username e senha vão ser usados para conectar no banco de dados
  - [connection-urls prisma](https://www.prisma.io/docs/orm/reference/connection-urls)
  - [Type Safety With Prisma & MongoDB](https://www.mongodb.com/developer/languages/typescript/type-safety-with-prisma-and-mongodb/)
  - [Connect MongoDB Using Prisma ORM in NestJS](https://medium.com/@1neel.sabne/connect-mongodb-using-prisma-orm-in-nestjs-9ae2e2776de2)
    - Trocou a o valor da DATABASE_URL do bd local usando docker para o db atlas local ou o inverso
      - Pare a aplicação
      - Troque o valor da DATABASE_URL
      - Rode db:generate para gerar os arquivos do prisma
      - Rode db:push para autenticar e criar as tabelas no banco de dados, dessa forma iremos syncronizar o banco de dados com o prisma
      - Rode novamente db:generate para gerar os arquivos do prisma
      - Rode a aplicação e pronto

      - Para o db atlas
        - Se depois disso tudo estiver dando erro de autenticação, verifique se o link do banco de dados está correto
        - Se estiver dando algum outro erro vê se o BD que foi criado do db atlas não tem outro database:
          - Indo em [Clusters](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/clusters)
          - View monitoring
          - Collections
            - Aqui teremos os databases que foram criados, como o comments(database name serve como param da url de conexão) e dentro dele as tabelas: comments e users
            - [Collections](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/metrics/replicaSet/671350d80a9f6374fce51004/explorer/comments/users/find)
        - Obs: So fazemos isso aqui para testar a conexão, para depois conectar na vercel, depois que testou volte a url de conexão do BD do docker no .env aqui no local e rode o db:push e db:generate para gerar os arquivos do prisma, e conectar com o docker localmente
    - Para vercel, basta colocar um env com o link do banco de dados do atlas, e "postinstall": "prisma generate && npx prisma db push" no script
    - E colocar 0.0.0.0/0 em [Network Access](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/security/network/accessList) para dar acesso qualquer ip para modificar o BD
 - [Introduction to MongoDB connection URIs](https://www.prisma.io/dataguide/mongodb/connection-uris)
 - [Cloud mongodb atlas](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/security/database/users) --> Usuarios do banco de dados
  - Serviço da nuvem do mongodb
 - [Cloud mongodb atlas](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/overview) --> Aqui tem o link para conectar no banco de dados mongodb usando a cloud atlas, usando aws, azure, google cloud...
  - Clicando em connect ele te mostra como conectar no BD
  - Indo em drivers, em baixo tem o link para conectar no BD
    - Passe esse link via env ou coloque no arquivo de configuração do prisma
  - Em database access fazemos os usuarios que podem ter acesso e configurar o acesso deles
    - [Database Access](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/security/database)
  - [Clusters](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/clusters) --> Indo em deployment>database connect, ele mostra também como conectar no BD
    - [Connect to comments](https://cloud.mongodb.com/v2/66f60925fecfa84548f894e4#/clusters/connect?clusterId=comments)
      - Drivers
      - Connecting with MongoDB Driver
      - Add your connection string into your application code
- [Prisma e nestJs](https://docs.nestjs.com/recipes/prisma)
- [z.string() validates empty strings](https://github.com/colinhacks/zod/issues/2466)
- [Replace](https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file)
- [ObjectId](https://www.mongodb.com/pt-br/docs/manual/reference/method/ObjectId/)
- [Controllers](https://docs.nestjs.com/controllers)
- [Axios com Nestjs](https://docs.nestjs.com/techniques/http-module)
- [NestJS: Make http requests using the @nestjs/axios package](https://yflooi.medium.com/make-http-requests-using-nestjs-native-nestjs-axios-package-4778eb19eb71)
- [Authentication](https://docs.nestjs.com/security/authentication)
- [Como tratar Error no nestj](https://chatgpt.com/c/67207544-f8ac-8010-a8c4-84ae3e53d11e)


- [Não há suporte para Prisma Migrate](https://www.prisma.io/docs/orm/overview/databases/mongodb#no-support-for-prisma-migrate)
  - npx prisma migrate dev --name init
    - Error: Error: The "mongodb" provider is not supported with this command. For more info see https://www.prisma.io/docs/concepts/database-connectors/mongodb
   0: schema_core::state::DevDiagnostic
             at schema-engine\core\src\state.rs:276
    - O mongoDb no prisma não possui o migrate, so precisamos dar um ```npx prisma generate``` para gerar os arquivos do prisma, e depois rodar o ```npx prisma db push``` para criar as tabelas no banco de dados
      - Ao dar um ```npx prisma generate``` conseguimos ter acesso as tabelas do banco de dados pelo intelisense e ao dar um ```npx prisma studio``` conseguimos ver as tabelas do banco de dados
    - [Obtendo o erro "O provedor 'mongodb' não é suportado com este comando" ao tentar migrar o mongoDB com o Prisma](https://stackoverflow.com/questions/73344053/getting-the-mongodb-provider-is-not-supported-with-this-command-error-when-t)


## Projetos que me ajudaram:
  - [phillcode-nestjs-config](https://github.com/phillippelevidad/phillcode-nestjs-config)
    - [seed dentro de um service](https://github.com/phillippelevidad/phillcode-nestjs-config/blob/main/src/app.service.ts)
    - [Mas fiz esse seed](https://github.com/PedrohvFernandes/nlw-unite/blob/main/api/prisma/seed.ts)
      - para rodar o seed, basta rodar o comando ```npx prisma db seed``` e ele irá rodar o seed que está no arquivo seed.ts
  - [Usando Prisma com MongoDB + Docker [NodeJs]](https://medium.com/@nailsonisrael/usando-prisma-com-mongodb-docker-nodejs-102d7e623a7b)
  - [Set up MongoDB + Prisma with Docker](https://haneenmahdin.medium.com/set-up-mongodb-prisma-with-docker-c8c2f28e85de)
  - [todo-prisma](https://github.com/raugusto96/todo-prisma/tree/main)
  - [Expressões Regulares Explicadas](https://chatgpt.com/c/66e34301-038c-8010-b6c2-cc69e57723cb)
  - [ignite-labe-node/notifications-service NESTJS](https://github.com/PedrohvFernandes/ignite-labe-node/tree/main/notifications-service)
  - [criando-minha-api-nest-com-type-orm](https://github.com/PedrohvFernandes/type-orm-estudos/tree/main/Criando%20uma%20API%20e%20CRUD%20completos%20com%20Nest%20e%20TypeORM/criando-minha-api-nest-com-type-orm)
  - [Sistema de paginação](https://github.com/PedrohvFernandes/nlw-unite/tree/main/api/src/routes)
  - [Sistema de paginação com docker](https://github.com/PedrohvFernandes/learn-to-use-docker/tree/main)
  - [Nlw expert](https://github.com/PedrohvFernandes/nlw-expert/tree/main)
  - [controle-de-metas](https://github.com/PedrohvFernandes/controle-de-metas/tree/main)
  - [maratona-explorer-ticket](https://github.com/Rocketseat/maratona-explorer-ticket/tree/main)

## Possíveis erros:
  - Error: MongoDB error
Kind: SCRAM failure: Authentication failed., labels: {}
   0: schema_core::commands::schema_push::Calculate `from`
             at schema-engine\core\src\commands\schema_push.rs:27
   1: schema_core::state::SchemaPush
             at schema-engine\core\src\state.rs:504
    - Solução: Verificar se o usuário e senha estão corretos no arquivo .env
    - Solução: Verificar se o link do banco de dados está correto no arquivo .env
    - Solução: Verificar se no link possui a tag ?authSource=admin, se não tiver, coloque ela no final do link
    - [How can I solve a SCRAM authentication issue in Mongodb with Docker and Prisma?](https://stackoverflow.com/questions/72708560/how-can-i-solve-a-scram-authentication-issue-in-mongodb-with-docker-and-prisma)
  - Error: Error: MongoDB error
Kind: Server selection timeout: No available servers. Topology: { Type: Unknown, Servers: [ { Address: localhost:5432, Type: Unknown, Error: Kind: I/O error: Nenhuma conexão pôde ser feita porque a máquina de destino as recusou ativamente. (os error 10061), labels: {} } ] }, labels: {}
   0: schema_core::commands::schema_push::Calculate `from`
             at schema-engine\core\src\commands\schema_push.rs:27
   1: schema_core::state::SchemaPush
             at schema-engine\core\src\state.rs:504
    - Solução: Verificar se o link do banco de dados está correto no arquivo .env
    - Solução: Verificar se no link esta o localhost com a porta 27017, se não tiver, coloque ele no link
    - Solução: Verificar se no arquivo do docker está a porta 27017, pois essa é a porta padrão do mongoDb
  - [Erro de conexão MongoDB](https://chatgpt.com/c/67144f3b-10f8-8010-91b3-790bcbce7fcc)
  - [Error: 
EPERM: operation not permitted, unlink 'C:\Users\Pedro\OneDrive\Documentos\GitHub\vue-nestjs-mongodb-pratica\api-nestjs\node_modules\.prisma\client\query_engine-windows.dll.node'](https://github.com/prisma/prisma/issues/9184)

## Criando OAuth com GitHub com NestJs
- [Video que me ajudou - Da UI ao Código - Ticket da Maratona Explorer](https://www.youtube.com/watch?v=qDerqzmELx8)
- [NestJS Authentication with OAuth2.0: Adding External Providers](https://dev.to/tugascript/nestjs-authentication-with-oauth20-adding-external-providers-2kj)
- [Creating social logins in NestJS](https://blog.logrocket.com/social-logins-nestjs/)
 - Assim como no front-end, precisamos passar as duas envs para o back-end, a do client_id e a do client_secret
 - E alem dessas duas, pegamos o code que o github nos retorna, e com ele pegamos o access_token
- [What is secret key for JWT based authentication and how to generate it?](https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it)
- [JWT - Criando a secret key](https://www.youtube.com/watch?v=ixQDGj-5zU8)
  - [JWT.io](https://jwt.io/)
  - env: ```JWT_SECRET= "secret"```
  - Para gerar:
    - no jwt.io, colocamos o secret e o payload, e ele nos retorna o token
  - [secret no JWT, qual a função?](https://cursos.alura.com.br/forum/topico-secret-no-jwt-qual-a-funcao-181996)

  ## Vercel e NestJs
    - [How to deploy your NestJS apps on Vercel](https://dev.to/leduc1901/how-to-deploy-your-nestjs-apps-on-vercel-3nh9)
    - [Nest Js Deploy Vercel in 3 Minutes](https://youtube.com/watch?v=YvwSgm22VGE)
    - [[EN] - React.js (Vite) + Nest.js Monorepo DEPLOY to VERCEL](https://www.youtube.com/watch?v=Gn26OXjaDfM)
    - [Deploying a NestJS and Redis App on Vercel: As Easy as Pie!](https://medium.com/@jeremy.brunel.fullstack/deploying-a-nestjs-and-redis-app-on-vercel-as-easy-as-pie-eb15e2849717)
    - [Deploying Nest.js Existing App To Vercel using Git](https://okolijohnson69.medium.com/deploying-nest-js-existing-app-to-vercel-using-git-438765474420)
    - [Need help to deploy NestJs app on Vercel](https://www.reddit.com/r/nestjs/comments/195pydl/need_help_to_deploy_nestjs_app_on_vercel/)
    - [Deploy Your NestJS App Like a Pro with Vercel in 2024 (Step-by-Step Guide)](https://www.todayunboxed.com/deploy-your-nestjs-app-like-a-pro-with-vercel-in-2024-step-by-step-guide)
    - [Vercel build dependency caching workaround](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/vercel-caching-issue)
      - [Erro na API NestJS](https://chatgpt.com/c/672667aa-f44c-8010-94a3-1c79539df17a)
        - Ajudou na conexão db atlas via vercel usando nestjs com prisma
    - [Prefix](https://vercel.com/docs/projects/domains/add-a-domain)