TKpress
Descrição:
Este projeto foi desenvolvido como parte do curso do GuiaDoProgramador. Ele é um sistema de blog e gerenciamento de conteúdo feito com Node.js e Express, utilizando a arquitetura MVC (Model-View-Controller). O objetivo é aplicar e aprofundar os conhecimentos técnicos, focando na integração de tecnologias back-end, como a conexão com o banco de dados e a manipulação de dados.

Status do Projeto:
O projeto ainda está em desenvolvimento e possui as funcionalidades essenciais para um MVP (Produto Mínimo Viável).

Tecnologias Utilizadas
Node.js: Ambiente de execução para o back-end do projeto.
Express: Framework web para Node.js, utilizado para roteamento e gerenciamento de requisições.
EJS (Embedded JavaScript): Motor de template para renderizar as views HTML com dados do servidor.
MySQL: Sistema de gerenciamento de banco de dados relacional para armazenar os dados do blog.
Sequelize: ORM (Object-Relational Mapping) para Node.js, facilitando a interação com o banco de dados MySQL de forma orientada a objetos.
Body-parser: Middleware para analisar o corpo das requisições HTTP, permitindo o acesso a dados de formulários.
Slugify: Biblioteca para converter strings em slugs amigáveis para URLs.

Funcionalidades Atuais
Gerenciamento de Artigos: Criação, leitura e exclusão de artigos.
Gerenciamento de Categorias: Criação e listagem de categorias para os artigos.
Página Inicial: Exibe todos os artigos em ordem decrescente de criação.
Página de Artigo: Visualiza um artigo individualmente através de sua URL amigável (slug).
Conexão com Banco de Dados: O servidor se conecta ao MySQL via Sequelize ao ser iniciado.

Como Rodar o Projeto
Pré-requisitos:

Node.js: Certifique-se de ter o Node.js instalado na sua máquina.
MySQL: Você precisará de uma instância do MySQL rodando localmente.
Instalação: 
Clone este repositório.
Navegue até o diretório do projeto e execute o comando abaixo para instalar as dependências:
npm install

Configuração do Banco de Dados:
Crie um arquivo de configuração para o banco de dados.
Defina as credenciais e o nome do banco de dados para a conexão.

Execução:
Inicie o servidor localmente com o comando:
node index.js (ou nodemon index.js para continuar rodando
O servidor estará disponível em http://localhost:8080 ou na porta que preferir.
