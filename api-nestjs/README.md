# NestJs + TypeScript + PrismaOrm + MongoDB - Um framework totalmente verboso, opinativo, modular

## Alguns videos/docs que me ajudaram

- [Docs NestJs](https://docs.nestjs.com/first-steps)
- [NestJS em 15 minutos, direto ao ponto!](https://www.youtube.com/watch?v=MDkpX6jBCEo)

### Envs
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
  -[Setting Up Environment Variables and Configurations in NestJS](https://bhargavacharyb.medium.com/setting-up-environment-variables-and-configurations-in-nestjs-a6372fb81f31)
    - Aqui usamos a lib: ```npm install --save dotenv```
      - Importamos no main.ts e com isso toda a aplicação tem acesso as variáveis de ambiente


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
