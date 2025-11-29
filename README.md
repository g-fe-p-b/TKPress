TKPress

Um CMS simples em Node.js usando Express e EJS, com gestão de artigos e categorias,
autenticação por sessão e integração com TinyMCE para edição de conteúdo.

**Recursos principais:**
- **Autenticação:** criação/login de usuários e sessões.
- **CRUD de Artigos:** criar, editar, listar e excluir artigos.
- **Categorias:** criação e associação de categorias aos artigos.
- **Editor WYSIWYG:** TinyMCE integrado no frontend para edição rica.
- **Interface:** views em EJS e estilos com Bootstrap em `public/css`.

**Estrutura relevante do projeto:**
- **`index.js`**: ponto de entrada principal.
- **`src/`**: lógica do servidor e controllers.
- **`views/`**: templates EJS (`partials`, `admin`, páginas públicas).
- **`public/`**: assets estáticos (CSS, JS, imagens, TinyMCE).
- **`models/` & `config/`**: configuração e modelos Sequelize.
- **`src/__tests__/`**: testes jest/supertest existentes.
- **`coverage/`**: relatórios de coverage gerados pelo jest.

**Tecnologias:**
- Node.js (ES modules)
- Express
- EJS
- Sequelize (MySQL, PostgreSQL ou SQLite conforme `config`)
- TinyMCE
- Bootstrap

**Instalação e uso rápido**

1. Clone o repositório:

```
git clone https://github.com/g-fe-p-b/TKPress
cd TKPress
```

2. Instale dependências:

```
npm install
```

3. Configure variáveis de ambiente (crie um arquivo `.env` na raiz).
Exemplo mínimo:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=tkpress
```

4. (Opcional) Rode migrations se estiver usando Sequelize e tiver migrations:

```
npx sequelize db:migrate
```

5. Inicie a aplicação localmente (usando Node):

```
start
```


Abra `http://localhost:3000` no navegador (porta padrão pode variar conforme `index.js`).

**Testes e Coverage**

- Rodar testes:

```
npm test
```

- Rodar testes em watch:

```
npm run test:watch
```

- Gerar coverage (Jest):

```
npm run test:coverage
```

Os relatórios de coverage ficam em `coverage/` e o lcov em `lcov.info`.

**Observações sobre configuração**
- O projeto usa Sequelize; ajuste `config/config.json` (ou `config/config.js`) e o arquivo `.env` conforme o banco desejado (MySQL, PostgreSQL ou SQLite).
- Sessões estão configuradas com `express-session` e `connect-session-sequelize`.

**Contribuição e melhorias futuras**
- Upload de imagens para artigos.
- Painel administrativo mais completo com estatísticas.


--
Arquivo atualizado automaticamente para refletir a estrutura atual do repositório.

API REST para integração externa.