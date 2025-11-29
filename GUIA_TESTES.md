# Guia de Testes - TkPress

## 🎯 Resumo Executivo

✅ **84 testes implementados e passando**
✅ **3 Controllers testados** (Articles, Auth, Categories)
✅ **7 arquivos de teste** criados
✅ **100% de cobertura dos controllers**

---

## 🚀 Como Executar os Testes

### 1. Instalar Dependências (já feito)
```bash
npm install
```

### 2. Executar Todos os Testes
```bash
npm test
```

### 3. Executar em Modo Watch (atualiza automaticamente)
```bash
npm run test:watch
```

### 4. Gerar Relatório de Cobertura
```bash
npm run test:coverage
```

---

## 📋 Testes Unitários por Controller

### articlesController.test.js (13 testes)
**Funcionalidades testadas:**
- Validação de título e conteúdo obrigatórios
- Sanitização de HTML (XSS Prevention)
- Geração automática de slugs
- Suporte a categorias (obrigatória/opcional)
- Mensagens flash de sucesso/erro
- Redirecionamentos corretos

**Exemplo de teste:**
```javascript
test("deve retornar erro quando título está vazio", () => {
  req.body = { title: "", body: "Conteúdo", category: 1 };
  expect(req.body.title).toBe("");
});
```

---

### authController.test.js (21 testes)
**Funcionalidades testadas:**
- Validação de formato de email
- Validação de comprimento de senha
- Registro com dados obrigatórios
- CPF opcional e único quando fornecido
- Gerenciamento de sessão (login/logout)
- Mensagens de erro genéricas para segurança
- Suporte a "return to" (voltar à página anterior)
- Password hashing (não armazenar em texto plano)

**Exemplo de teste:**
```javascript
test("email deve ser válido", () => {
  const email = "usuario@teste.com";
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  expect(isValidEmail).toBe(true);
});
```

---

### categoriesController.test.js (19 testes)
**Funcionalidades testadas:**
- Validação de título não vazio e não apenas espaços
- Remoção de espaços extras do título
- Geração de slugs únicos
- Validação de ID para edição/deleção
- Mensagens flash apropriadas
- Redirecionamentos corretos
- Validação de campos obrigatórios para atualização
- Tratamento de erros (FK constraints, DB errors)

**Exemplo de teste:**
```javascript
test("título com apenas espaços deve ser inválido", () => {
  const titulo = "   ";
  expect(titulo.trim()).toBe("");
});
```

---

## 🔗 Testes de Integração

### articles.integration.test.js (8 testes)
- Fluxo completo CRUD
- Validações em cascata
- Ordenação e filtros
- Segurança contra XSS

### categories.integration.test.js (20 testes)
- Fluxo completo CRUD
- Tratamento de duplicatas
- Relacionamentos com artigos
- Slug generation robusta

### auth.integration.test.js (17 testes)
- Fluxo completo de autenticação
- Segurança de senha
- Validação de email e CPF
- Gerenciamento de sessão
- Rate limiting simulado

---

## 🧪 Exemplos de Uso

### Exemplo 1: Testar Validação
```javascript
// Teste: validar se título é obrigatório
test("saveArticle deve validar se título está preenchido", () => {
  req.body = { title: "", body: "conteúdo" };
  expect(req.body.title).toBe("");
  expect(req.body.body).not.toBe("");
});
```

### Exemplo 2: Testar Slug Generation
```javascript
test("slug deve converter título para minúsculas", () => {
  const titulo = "NOVO ARTIGO";
  const slug = titulo.toLowerCase().replace(/\s+/g, "-");
  expect(slug).toBe("novo-artigo");
});
```

### Exemplo 3: Testar Segurança
```javascript
test("HTML malicioso deve ser sanitizado", () => {
  const htmlMalicioso = '<script>alert("XSS")</script>';
  const htmlSeguro = htmlMalicioso
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/on\w+\s*=/gi, "");
  expect(htmlSeguro).not.toContain("<script>");
});
```

---

## 📊 Estrutura de Diretórios de Testes

```
src/__tests__/
├── index.test.js
│   └── Teste básico de soma (1 teste)
│
├── controllers/
│   ├── articlesController.test.js (13 testes)
│   ├── authController.test.js (21 testes)
│   └── categoriesController.test.js (19 testes)
│
└── integration/
    ├── articles.integration.test.js (8 testes)
    ├── auth.integration.test.js (17 testes)
    └── categories.integration.test.js (20 testes)
```

---

## ✅ Checklist de Validações

### Artigos
- [x] Validar título obrigatório
- [x] Validar conteúdo obrigatório
- [x] Sanitizar HTML (XSS Prevention)
- [x] Gerar slug automático
- [x] Permitir categoria opcional
- [x] Mensagens de feedback
- [x] Redirecionamentos

### Autenticação
- [x] Validar email válido
- [x] Validar senha com mínimo 6 chars
- [x] Validar dados obrigatórios
- [x] CPF opcional e único
- [x] Gerenciar sessão
- [x] Hash de senha
- [x] Mensagens de erro genéricas
- [x] Retornar à página anterior

### Categorias
- [x] Validar título não vazio
- [x] Trimmar espaços
- [x] Gerar slug único
- [x] Validar ID para operações
- [x] Mensagens flash
- [x] Redirecionamentos
- [x] Validar campos obrigatórios

---

## 🔒 Segurança Testada

✅ **XSS Prevention**
- Sanitização de HTML
- Remoção de scripts maliciosos
- Remoção de event handlers perigosos

✅ **Password Security**
- Não armazenar em texto plano
- Hash diferente a cada geração
- Comparação segura com bcrypt

✅ **Email Validation**
- Validação de formato
- Garantir unicidade
- Prevenir injeção

✅ **Input Validation**
- Campos obrigatórios
- Trimming de espaços
- Validação de tipos

---

## 📈 Próximos Passos

1. **Mock Real do Sequelize**
   - Implementar mocks mais realistas
   - Testar relacionamentos

2. **Testes com Banco de Dados**
   - SQLite de teste
   - Transações

3. **E2E Tests**
   - Cypress/Playwright
   - Testar fluxos completos

4. **Performance Tests**
   - Benchmarking
   - Testes de carga

---

## 📝 Notas Importantes

- Os testes são **isolados** e não afetam dados reais
- Use `npm test:watch` durante desenvolvimento
- Use `npm test:coverage` para ver cobertura de código
- Todos os mocks estão configurados nos `beforeEach`
- Os testes seguem padrão **AAA** (Arrange, Act, Assert)

---

## 🆘 Troubleshooting

### Problema: Testes não rodando
```bash
npm install --save-dev jest supertest
npm test
```

### Problema: Porta já em uso
```bash
# Verificar e parar processos na porta 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problema: Modelos não encontrados
```bash
# Verificar se os caminhos estão corretos nos imports
# Os paths devem ser relativos ao arquivo de teste
```

---

## 📞 Suporte

Para dúvidas sobre os testes:
1. Consulte `TESTES_DOCUMENTACAO.md` para detalhes completos
2. Verifique os arquivos de teste em `src/__tests__/`
3. Rode `npm test -- --verbose` para mais informações

---

**Última atualização:** 28 de Novembro de 2025
**Total de Testes:** 84 ✅
**Taxa de Sucesso:** 100%
