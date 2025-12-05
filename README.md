TKPress

Um CMS simples e escalável originalmente em Node.js + Express + EJS. O backend foi migrado para TypeScript (arquivos em `src/`) mantendo a mesma estrutura e funcionalidade.

🚀 Funcionalidades

Autenticação

Tela de login e criação de conta integradas.

Alternância entre login e registro em um único painel.

Gestão de Conteúdo

Criação, edição e exclusão de artigos.

Gestão de categorias com edição rápida e validação.

Editor de texto com suporte a formatação (TinyMCE integrado).

Interface e Experiência

Navbar redesenhada com logo e consistência de estilo em todas as páginas.

Layout baseado em grid responsivo e moderno.

Cards, botões e formulários padronizados para melhor clareza visual.

Notificações e feedbacks acessíveis (ex: confirmações ao deletar).

SEO e Acessibilidade

Estrutura semântica e otimizada para buscadores.

Uso de atributos ARIA para leitores de tela.

Hierarquia clara de conteúdo (hero section, CTAs, listagem de artigos).

🛠️ Tecnologias

Backend: Node.js, Express

Frontend: EJS, Bootstrap (customizado)

Banco de Dados: por padrão usa SQLite (via Sequelize). É possível configurar MySQL/Postgres no `src/config/database.js`.

Editor de Texto: TinyMCE

Autenticação: Sessions / JWT (dependendo da configuração)

/views
  /partials        -> Header, Footer, Navbar, etc.
  /home            -> Página inicial
  /admin
    /articles      -> CRUD de artigos
    /categories    -> CRUD de categorias
    /auth          -> Login e Registro
/public
  /images          -> Logo e assets estáticos
  /css             -> Estilos customizados

  

📖 Como rodar o projeto (atualizado para TypeScript)

1) Clone o repositório

```powershell
git clone https://github.com/g-fe-p-b/TKPress
cd TKPress
```

2) Instale dependências

```powershell
npm install
```

3) Observações sobre o banco de dados

- Por padrão o projeto está configurado para usar SQLite (arquivo: `./tkpress.sqlite`) via `src/config/database.js`.
- Se preferir MySQL/Postgres, edite `src/config/database.js` ou configure variáveis de ambiente conforme sua versão do Sequelize.

4) Comandos úteis

- Rodar em desenvolvimento (com recarga):

```powershell
npm run dev
```

- Rodar com nodemon/watch (alternativa):

```powershell
npm run dev:watch
```

- Executar verificação TypeScript (typecheck):

```powershell
npx tsc --noEmit
```

- Rodar testes (Jest):

```powershell
npm test
```

5) Observações importantes (migração para TypeScript)

- As importações ESM no runtime usam extensões `.js` (por exemplo em `index.ts` e nas rotas/controllers). O executor `tsx` mapeia essas importações para os arquivos TypeScript durante a execução.
- Existe um arquivo temporário de declarações: `src/types/custom.d.ts` para silenciar pacotes sem `@types` instalados. Isso é uma medida provisória.
- Durante a migração foram usadas marcações `any` em vários controllers/middlewares para acelerar a transição. Recomendo substituir esses `any` por tipos corretos (`Request`, `Response`, `NextFunction` do Express e interfaces para os modelos Sequelize) em uma próxima etapa.
- Recomendo instalar as declarações de tipos quando disponíveis (ex.: `@types/express`, `@types/node`) e remover declarações locais quando apropriado.

6) Problemas comuns

- Erro de importação "Cannot find module './...Controller.js'" — certifique-se de rodar o projeto com o `tsx` (script `dev`) ou com um loader ESM compatível com TypeScript (`ts-node/esm`) se preferir essa abordagem.


🌟 Futuras melhorias

Painel administrativo com dashboard e estatísticas.

Upload de imagens nos artigos.

Temas customizáveis para UI.

API REST para integração externa.