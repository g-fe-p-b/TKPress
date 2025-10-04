TKPress

Um CMS simples e escalável desenvolvido em Node.js + Express + EJS, com foco em boa experiência do usuário, UI consistente e estrutura otimizada para SEO.

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

Banco de Dados: MySQL ou PostgreSQL (via Sequelize)

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

  
📖 Como rodar o projeto

Clone este repositório:

git clone [https://github.com/seuuser/tkpress.git](https://github.com/g-fe-p-b/TKPress)
cd tkpress


Instale as dependências:

npm install


Configure o banco de dados no arquivo .env. Exemplo:

DB_HOST=localhost
DB_USER=root
DB_PASS=senha
DB_NAME=tkpress


Rode as migrations (se estiver usando Sequelize):

npx sequelize db:migrate


Inicie o servidor:

npm start


Acesse no navegador:

http://localhost:3000

🌟 Futuras melhorias

Painel administrativo com dashboard e estatísticas.

Upload de imagens nos artigos.

Temas customizáveis para UI.

API REST para integração externa.
