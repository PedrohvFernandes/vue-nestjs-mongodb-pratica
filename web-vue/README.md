# Vue 3 + TypeScript + Vite

## Instale as extensões para pegar a sintaxe do vue

#### Nome: Vue 3 Snippets
```
{
  ID: hollowtree.vue-snippets
  Descrição: A Vue.js 3 And Vue.js 2 Code Snippets Extension
  Versão: 1.0.4
  Editor: hollowtree
  Link do Marketplace do VS: https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets
}
```

#### Nome: Vue - Official
```
{
  ID: Vue.volar
  Descrição: Language Support for Vue
  Versão: 2.1.6
  Editor: Vue
  Link do Marketplace do VS: https://marketplace.visualstudio.com/items?itemName=Vue.volar
}
```
### Nome: Vetur TypeScript performance workaround
```
{
  ID: snovakovic.vtpw
  Descrição: Workaround for the performance issues with vetur plugin when used in combination with TypeScript
  Versão: 0.1.2
  Editor: Stefan Novakovic
  Link do Marketplace do VS: https://marketplace.visualstudio.com/items?itemName=snovakovic.vtpw
}
```

### Se necessário: Nome: Vue Extension Box. 

Extensão de pacote para ajudar no vue. Se não precisar do sass pode instalar as outras independentemente ou instale a extensão toda e depois desinstale a extensão de sass. Se você usa o prettier sem o eslint pode deixar a extensão instalada, se não, pode desinstalar ela também ou desabilitar. No meu caso vou usar o eslint e o prettier dentro do eslint.

```
{
  ID: MisterJ.vue-volar-extention-pack
  Descrição: This extension packs uses the latest vue extension that really works well with different vue projects.
  Versão: 2.0.8
  Editor: BroJenuel
  Link do Marketplace do VS: https://marketplace.visualstudio.com/items?itemName=MisterJ.vue-volar-extention-pack
}
```

## Alguns videos/docs que me ajudaram

- [Vue 3 + TypeScript + Vite](https://vite.dev/guide/)
- [Vue 3 + TypeScript + Vite](https://www.youtube.com/watch?v=zZziykF3ks4)

- [shadcn-vue(Parecido com o shadcn-ui do react)](https://www.shadcn-vue.com/docs/installation/vite)
  - [Uma lib parecida com radix-ui do react, diferença que adaptada pra vue](https://www.radix-vue.com/overview/getting-started.html)
- [TailwindCss, mesmo framework css para React](https://tailwindcss.com/docs/guides/vite#vue)

- [Eslint para vue 3 - Eslint no Vue 3 | Como configurar o eslint no vue 3](https://www.youtube.com/watch?v=rMoHmWZXySM)

## Sequencia de instalação

### Config

- npm create vite@latest
 - Nome para o projeto
 - Selecione o projeto que deseja instalar. Nesse caso vue
 - TypeScript
 - ```npm i``` para instalar as dependências

- Exclua arquivos desnecessários

- Instale as extensões necessárias do vue no VsCode

- ```npm run dev``` para iniciar o servidor

- npm i -D tailwindCss autoprefixer postcss
  - Config para o tailwindcss:
    ```js
      export default {
        content: [
          "./index.html",
          "./src/**/*.{vue,js,ts}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }
    ```
  - configure o style.css dentro de src, mude o nome para main.css. Em main.ts mude o nome da importação do css principal de toda a aplicação, para main.css
    - Dentro do main.css coloque o que esta no nosso arquivo main.css. Que são coisas necessárias para o tailwindcss rodar.

  - Configure o vite como esta no vite.config.ts dessa pasta.
    - npm install @types/node --save-dev
    - Coloque o postcss em css e os plugins do postcss: plugins: [tailwind(), autoprefixer()]
    - Coloque os mappings para os arquivos do vue:
    ```ts
        resolve: {
          alias: {
            // npm install @types/node --save-dev para pegar o alias __dirname
            '@': path.resolve(__dirname, './src'),
          },
        },
    ```
  - Crie mappings para os arquivos do vue
    - Crie ```tsconfig.paths.json```
    - Depois em ```tsconfig.app.json``` coloque: 
    ```Json
       "extends": "./tsconfig.paths.json"
    ```
- Configurando o eslint V8(V9 ta diferente e estranho). Pode copiar o arquivo eslint para vue para o seu projeto, como está aqui na pasta raiz.
  - Lembre de copiar e usar o .vscode daqui da pasta, para o Eslint funcionar
  - Para iniciar um novo arquivo eslint:
  ```
    npx eslint --init
    Enter
    To check syntax and find problems
    JavaScript modules (import/export)
    Vue.js
    Does your project use TypeScript? Yes(Isso para projetos como o meu que está trabalhando com TS, se não, marque No)
    Where does your code run? Selecione: Browser e Node(So dar barra de espaço para marcar ou desmarcar)
    What format do you want your config file to be in? Javascript ou sua preferencia

    The config that you've selected requires the following dependencies:
    eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-vue
    Would you like to install them now? Yes 

    Which package manager do you want to use? NPM/Yarn... sua preferencia
    
    E pronto ele vai criar um arquivo de config do eslint 
  ```
    - npm i eslint eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-vuejs-accessibility eslint-plugin-import -D
      - npx eslint --init --> Com isso ele ira criar uma config do eslint, instalar demais dependencias. E se você quiser, pode colocar mais plugins e rules(O meu arquivo já está do jeito que eu quero com o prettier e com eslint-plugin-vuejs-accessibility que é tipo o jsx-a11y do react) 

  - [Docs - eslint-plugin-vue](https://eslint.vuejs.org)
  - [Docs - eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/)

  - [No fim eu fiz um pacote npm da minha config eslint](https://www.npmjs.com/package/@pedrohvfernandes/eslint-config-vue). Basicamente eu faço a config do eslint antes em algum projeto vue/react, vejo se esta corrigindo os erros(fiz isso para o react, next e node também), e depois eu crio um pacote com essas configs, para depois no projeto que foi criado a config eslint enorme so extender essas configs no arquivo .eslintrc.json, que antes era um .eslintrc.cjs com as configs, agora nada mais é que um JSON estendendo o meu arquivo vue.js do meu pacote ```npm i @pedrohvfernandes/eslint-config-vue``` que era .eslintrc.cjs 

  - Agora instale: ``` npm i husky git-commit-msg-linter -D``` na raiz do projeto. Primeiro porque o husky precisa ter acesso ao .git do projeto, ou seja, so na raiz do projeto temos acesso ao .git onde fica os hooks. Então pode ser aqui na web-vue e nem na pasta de api. E o git-commit-msg-linter porque iremos fazer commit pelo terminal da raiz

  - Depois instale nesse projeto do front: ``` npm i lintstagedrc -D``` e crie o arquivo ```lintstagedrc.json```

  - Por ultimo crie um vercel.json com o seguinte formato:
  ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/" }]
    }
  ```
  Para caso você use o vercel para publicar seu projeto.

  ### Configurando componentes usando a lib shadncn-vue(igual a shadcn-ui do react)

  - [Docs - Shadcn-vue](https://www.shadcn-vue.com/docs/installation/vite)
    - De um ```npx shadcn-vue@latest init```
      - O que eu selecionei
        ```
        npx shadcn-vue@latest init
        Need to install the following packages:
        shadcn-vue@0.10.5
        Ok to proceed? (y)
        √ Would you like to use TypeScript? (recommended)? ...yes
        √ Which framework are you using? » Vite
        √ Which style would you like to use? » New York
        √ Which color would you like to use as base color? » Slate
        √ Where is your tsconfig.json file? ... ./tsconfig.json
        √ Where is your global CSS file? (this file will be overwritten) ... src/assets/index.css
        √ Write configuration to components.json. Proceed? ... yes
        ```

    - Depois de um ```npx shadcn-vue@latest add```, de um ```ctrl+a+space``` para selecionar todos os componentes e de enter para a lib criar esses componentes.

    - Ou ```npx shadcn-vue@latest add button``` para adicionar um componente especificio 

    - Ele ira gerar o arquivo ```components.json```
    Você tem que ter criado o mapping paths no tsconfig.json. Porque ele usa, para saber onde colocar os componentes da lib e os utilitários
    ```json
      "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils"
     }
    ```
  ### [Sistema de rotas Vue](https://chatgpt.com/c/670581be-0058-8010-a5b0-a8e523a0a9c6)

  ### [Vue 3 Props e Defaults](https://chatgpt.com/c/6705dcc5-4ddc-8010-8120-30d668d1dfcf)

  ### [Utilizando o SVG como um componente no Vue e Vite](https://wallacemaxters.com.br/blog/101/utilizando-o-svg-como-um-componente-no-vue-e-vite#google_vignette)

  ### Erro na vercel, do deploy usando o Npm e vite: Error: Cannot find module @rollup/rollup-linux-x64-gnu

  Solução:
  ```json
    "overrides": {
    "vite": {
      "rollup": "npm:@rollup/wasm-node"
    }
  },
  ```
  Mais soluções:
    - [Solução 1](https://github.com/vitejs/vite/issues/15167)
    - [Solução 2](https://stackoverflow.com/questions/77569907/error-in-react-vite-project-due-to-rollup-dependency-module-not-found)


### [Vue 3 | O básico para você iniciar com o Vue 3](https://www.youtube.com/watch?v=xS9KVesgQ28)
  - v-model
  - refs e reactive
  - v-if --> Criando outra template dentro de outra, para por exemplo mostrar um email na tela, caso o usuario tenha colocado um email no input e email. É tipo um ternario do react
    - Ex: ```<template v-if="user.email.length"> <p>Email vazio</p> </template>``` --> Aí esse template vai dentro de outro template, e só vai aparecer se o email do usuario for maior que 0
  - v-else --> Se o v-if não for verdadeiro, ele vai mostrar o que esta dentro do v-else: Ex: ```<template v-else> <p>Email: {{user.email}}</p> </template>```
  - onMounted --> É tipo o useEffect do react, ele é chamado quando o componente é montado
  - form
  - v-for --> lista de itens, tipo o map do react
  - Botão com evento click para remover um item da lista -->  v-on
    - findIndex para achar o index do item que queremos remover
    - splice para remover um item da lista
  - Usando tailwindcss

### [Estrutura da composition api | Composition API Vue 3](https://www.youtube.com/watch?v=QmRbcU2OwrM)

### [VueJS em 1 hora! (Teoria e prática)](https://www.youtube.com/watch?v=cSa-SMVMGsE)
  - v-bind
  - O v vem de vue, e o bind é para ligar um valor a um atributo do html
  - 



### [Dark & Light Mode With Vue, VueUse & Tailwind CSS](https://www.youtube.com/watch?v=7_mqThfC_yM)
### [Adding a Dark Mode to Vue in 5 Minutes](https://www.youtube.com/watch?v=cGN91TLXrC8)
  - [Docs VueUse](https://vueuse.org/guide/)

### Ideias
  - [Tailwind CSS Headings - Flowbite](https://flowbite.com/docs/typography/headings/)
  - Cards comments
    - [6 Tailwind Comment Components](https://freefrontend.com/tailwind-comments/)
    - [Tailwind CSS Comments Sections](https://pagedone.io/blocks/e-commerce/comment-list)
    - [Tailwind CSS Comments Sections - Flowbite](https://flowbite.com/blocks/publisher/comments/)

### [Pagination e tanstack query](https://www.youtube.com/watch?v=0Njxq9UcL9s)
  - [TamsStack Query](https://tanstack.com/query/v5/docs/framework/vue/overview)
    - [Vue Query](https://vue-query.vercel.app/#/,)

### Meus projetos que me ajudaram
  - [nlw-unite](https://github.com/PedrohvFernandes/nlw-unite/tree/main)
    - Route Params
    - [Fazendo um Pagination no back-end](https://github.com/PedrohvFernandes/nlw-unite/blob/main/api/src/routes/get-event-attendees.ts)
    - [Pegando o Pagination do front e usando ele no front-end](https://github.com/PedrohvFernandes/nlw-unite/blob/main/pass-in-web/src/components/attendee-list.tsx)
  - [cupcakes](https://github.com/PedrohvFernandes/cupcakes/blob/main)
    - Config IsDev
  - [controle-de-metas](https://github.com/PedrohvFernandes/controle-de-metas/tree/main)
    - UseQuery
  - [react-practice](https://github.com/PedrohvFernandes/react-practice/tree/main)
    - Pagination
    - UseQuery
    - Route Params

### Error na vercel por conta do dayjs locale/pt-br
  - Error: 
  ```
  [vite]: Rollup failed to resolve import "dayjs/locale/pt-BR" from "/vercel/path0/web-vue/src/utils/date-formatted.ts".
  This is most likely unintended because it can break your application at runtime.
  If you do want to externalize this module explicitly add it to
  `build.rollupOptions.external
  ```
  - [Solução](https://stackoverflow.com/questions/71552229/vite-how-do-i-use-a-wildcard-in-rollupjs-build-rollupoptions-external)
  No arquivo do vite.config.ts:
  ```ts
    build: {
      rollupOptions: {
        external: [
          'dayjs/locale/*' ou 'dayjs/locale/pt-BR'
        ]
      }
    }
  ```