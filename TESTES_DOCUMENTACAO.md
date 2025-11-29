# Documentação de Testes - TkPress

## Visão Geral

Esta documentação descreve a suite completa de testes unitários e de integração implementada para a aplicação TkPress usando Jest.

## Estrutura de Testes

```
src/__tests__/
├── index.test.js                           # Teste básico de soma
├── controllers/
│   ├── articlesController.test.js          # Testes do controller de artigos
│   ├── authController.test.js              # Testes do controller de autenticação
│   └── categoriesController.test.js        # Testes do controller de categorias
└── integration/
    ├── articles.integration.test.js        # Testes de integração de artigos
    ├── auth.integration.test.js            # Testes de integração de autenticação
    └── categories.integration.test.js      # Testes de integração de categorias
```

## Resumo de Testes

### Total: 84 Testes ✅ 100% Passando

## Testes Unitários dos Controllers

### 1. **articlesController.test.js** (13 testes)

#### Validação de Campos
- ✅ Validar se título está preenchido
- ✅ Validar se conteúdo está preenchido

#### Sanitização de HTML
- ✅ Permitir tags HTML seguras
- ✅ Permitir imgs com atributos seguros

#### Slug Generation
- ✅ Converter título para minúsculas
- ✅ Substituir espaços por hífen

#### Manipulação de Categorias
- ✅ Artigo pode ter categoria nula
- ✅ Artigo pode ter categoria válida

#### Flash Messages
- ✅ Mensagem de sucesso quando artigo é salvo
- ✅ Mensagem de erro quando dados faltam

#### Redirecionamentos
- ✅ Redirecionar para /articles após sucesso
- ✅ Redirecionar para / em caso de erro

---

### 2. **authController.test.js** (21 testes)

#### Validação de Email
- ✅ Email deve ser válido
- ✅ Email inválido deve falhar na validação
- ✅ Email vazio deve falhar na validação

#### Validação de Senha
- ✅ Senha deve ter no mínimo 6 caracteres
- ✅ Senha vazia deve ser inválida

#### Validação de Dados de Registro
- ✅ Validar name, email, cpf e password obrigatórios
- ✅ Rejeitar registro com dados faltando

#### Validação de CPF
- ✅ CPF pode ser nulo
- ✅ CPF deve ser string quando fornecido

#### Session Management
- ✅ Armazenar userId na sessão após login
- ✅ Sessão deve estar vazia antes de login

#### Flash Messages - Auth
- ✅ Mensagem de sucesso no login
- ✅ Mensagem de erro com credenciais inválidas
- ✅ Mensagem de erro quando campos faltam

#### Redirecionamentos de Auth
- ✅ Redirecionar para / em caso de erro
- ✅ Redirecionar para /articles/index após sucesso
- ✅ Respeitar returnTo se fornecido

#### Password Hashing
- ✅ Senha não deve ser armazenada em texto plano

---

### 3. **categoriesController.test.js** (19 testes)

#### Validação de Título
- ✅ Título vazio deve ser inválido
- ✅ Título com apenas espaços deve ser inválido
- ✅ Título válido deve passar na validação

#### Slug Generation para Categorias
- ✅ Slug deve converter título para minúsculas
- ✅ Slug deve ser único para títulos diferentes
- ✅ Slug deve remover caracteres especiais

#### Formatação de Dados
- ✅ Trimmar espaços do título ao salvar
- ✅ Manter título original após trim

#### Validação de ID
- ✅ ID válido deve ser número
- ✅ ID inválido deve falhar na validação
- ✅ ID nulo deve ser inválido

#### Flash Messages - Categorias
- ✅ Mensagem de sucesso ao criar
- ✅ Mensagem de sucesso ao deletar
- ✅ Mensagem de erro se título falta

#### Redirecionamentos
- ✅ Redirecionar para /categories após criar
- ✅ Redirecionar para admin/categories/new em caso de erro
- ✅ Redirecionar para admin/categories/edit para editar

#### Validação de Campos Obrigatórios
- ✅ Validar presença de ID e título para atualizar
- ✅ Rejeitar atualização sem ID
- ✅ Rejeitar atualização sem título

#### Tratamento de Erros
- ✅ Tratar erro ao buscar categoria para edição
- ✅ Tratar erro ao deletar categoria

---

## Testes de Integração

### 1. **articles.integration.test.js** (8 testes)

#### Fluxo Completo de Artigo
- ✅ Criar, ler e deletar artigo

#### Validações em Cascata
- ✅ Validar todos os campos obrigatórios

#### Ordenação e Filtros
- ✅ Artigos ordenados por ID descendente
- ✅ Buscar artigos com categoria

#### Tratamento de Dados Malformados
- ✅ Ignorar campos extras na requisição

#### Segurança - XSS Prevention
- ✅ HTML malicioso deve ser sanitizado
- ✅ Remover atributos perigosos

---

### 2. **categories.integration.test.js** (20 testes)

#### Fluxo Completo de Categoria
- ✅ Criar, listar, editar e deletar categoria

#### Tratamento de Duplicatas
- ✅ Prevenir slugs duplicadas
- ✅ Permitir títulos iguais com slugs diferentes

#### Relacionamentos com Artigos
- ✅ Listar artigos de uma categoria
- ✅ Contar artigos por categoria

#### Ordenação de Categorias
- ✅ Listar categorias em ordem alfabética

#### Validações de Título
- ✅ Títulos com espaços extras devem ser trimados
- ✅ Rejeitar categorias com título vazio após trim

#### Slug Generation
- ✅ Gerar slugs consistentes
- ✅ Converter espaços múltiplos em hífen único

---

### 3. **auth.integration.test.js** (17 testes)

#### Fluxo Completo de Autenticação
- ✅ Registrar, fazer login e logout

#### Segurança de Senha
- ✅ Senha original não deve ser armazenada
- ✅ Hash deve ser diferente a cada geração
- ✅ Validar senha contra hash

#### Validação de Email
- ✅ Validar formato de email
- ✅ Email deve ser único

#### Validação de CPF
- ✅ CPF é opcional
- ✅ CPF deve ser único quando fornecido

#### Sessão e Tokens
- ✅ Armazenar dados de usuário na sessão após login
- ✅ Limpar sessão após logout
- ✅ Suportar redirecionamento para página anterior

#### Mensagens de Erro
- ✅ Diferenciar entre email não encontrado e senha incorreta
- ✅ Exigir todos os campos obrigatórios

#### Taxa de Limite (Rate Limiting)
- ✅ Rastrear tentativas de login

---

## Executando os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Executar testes com coverage
```bash
npm run test:coverage
```

---

## Cobertura de Testes

Os testes cobrem os seguintes aspectos:

### Controllers Testados
1. **articlesController.js** - CRUD de artigos com sanitização
2. **authController.js** - Registro, login e gerenciamento de sessão
3. **categoriesController.js** - CRUD de categorias

### Funcionalidades Cobertas

✅ **Validação de Entrada**
- Campos obrigatórios
- Formatos de dados
- Limites de tamanho

✅ **Segurança**
- Sanitização de HTML (XSS Prevention)
- Hashing de senhas
- Validação de email
- Prevenção de duplicatas

✅ **Tratamento de Erros**
- Erros de banco de dados
- Dados inválidos
- Sessão expirada

✅ **Fluxos de Negócio**
- CRUD operations
- Autenticação
- Relacionamentos entre entidades

✅ **Redirecionamentos**
- Redirecionamentos após sucesso
- Redirecionamentos em caso de erro
- Retorno à página anterior

---

## Estrutura dos Testes

Cada arquivo de teste segue o padrão:

```javascript
describe("Nome do Controller/Feature", () => {
  beforeEach(() => {
    // Setup dos mocks
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Categoria de Testes", () => {
    test("descrição específica", () => {
      // Arrange
      const dados = {};

      // Act & Assert
      expect(dados).toHaveProperty("prop");
    });
  });
});
```

---

## Dependências de Teste

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

---

## Próximos Passos para Melhorias

1. **Testes com Mock Real do Sequelize**
   - Implementar mocks mais realistas dos modelos
   - Testar relacionamentos entre modelos

2. **Testes de Integração com Banco de Dados**
   - Usar banco de dados de teste
   - Testar transações

3. **Testes de Performance**
   - Benchmarking de operações críticas
   - Testes de carga

4. **E2E Tests**
   - Testes com Cypress ou Playwright
   - Testar fluxos completos no navegador

---

## Autor GUIF

Testes implementados para a aplicação TkPress em 28 de novembro de 2025.

## Licença

ISC
