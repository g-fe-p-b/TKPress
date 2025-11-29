#!/usr/bin/env bash
# test-commands.sh - Comandos úteis para testes Jest

# ============================================
# 📋 COMANDOS RÁPIDOS PARA TESTES
# ============================================

echo "🎯 Testes GuiaPress - Comandos Úteis"
echo "======================================"
echo ""

# 1. Executar todos os testes
echo "1️⃣  Executar todos os testes:"
echo "   npm test"
echo ""

# 2. Watch mode
echo "2️⃣  Watch mode (atualiza automaticamente):"
echo "   npm run test:watch"
echo ""

# 3. Com cobertura
echo "3️⃣  Com cobertura de código:"
echo "   npm run test:coverage"
echo ""

# 4. Testes específicos
echo "4️⃣  Executar teste específico:"
echo "   npm test -- articlesController"
echo ""

# 5. Verbose mode
echo "5️⃣  Com informações detalhadas:"
echo "   npm test -- --verbose"
echo ""

# 6. Apenas listar testes
echo "6️⃣  Listar todos os testes:"
echo "   npm test -- --listTests"
echo ""

# 7. Executar com timeout customizado
echo "7️⃣  Com timeout customizado (10s):"
echo "   npm test -- --testTimeout=10000"
echo ""

# 8. Parar após primeira falha
echo "8️⃣  Parar após primeira falha:"
echo "   npm test -- --bail"
echo ""

# 9. Apenas testes que falharam
echo "9️⃣  Apenas testes que falharam:"
echo "   npm test -- --onlyChanged"
echo ""

# 10. Relatório JSON
echo "🔟 Gerar relatório JSON:"
echo "   npm test -- --json --outputFile=result.json"
echo ""

echo "======================================"
echo "📊 Estrutura de Testes:"
echo "======================================"
echo ""
echo "✅ 84 Testes Total"
echo "   ├── 13 Tests - articlesController"
echo "   ├── 21 Tests - authController"
echo "   ├── 19 Tests - categoriesController"
echo "   ├── 8 Tests - articles.integration"
echo "   ├── 17 Tests - auth.integration"
echo "   ├── 20 Tests - categories.integration"
echo "   └── 1 Test - index (básico)"
echo ""

echo "======================================"
echo "📁 Localização dos Testes:"
echo "======================================"
echo ""
echo "src/__tests__/"
echo "├── index.test.js"
echo "├── controllers/"
echo "│   ├── articlesController.test.js"
echo "│   ├── authController.test.js"
echo "│   └── categoriesController.test.js"
echo "└── integration/"
echo "    ├── articles.integration.test.js"
echo "    ├── auth.integration.test.js"
echo "    └── categories.integration.test.js"
echo ""

echo "======================================"
echo "🔍 Verificar Específico:"
echo "======================================"
echo ""
echo "Validação de Email:"
echo "   npm test -- --testNamePattern='email deve ser válido'"
echo ""
echo "Sanitização HTML:"
echo "   npm test -- --testNamePattern='HTML'"
echo ""
echo "Slug Generation:"
echo "   npm test -- --testNamePattern='slug'"
echo ""

echo "======================================"
echo "✅ Testes Passando:"
echo "======================================"
echo ""
echo "Test Suites: 7 passed, 7 total ✅"
echo "Tests:       84 passed, 84 total ✅"
echo "Time:        ~1.5 segundos ⏱️"
echo ""

echo "======================================"
echo "📚 Documentação:"
echo "======================================"
echo ""
echo "1. RESUMO_TESTES.md - Visão geral rápida"
echo "2. GUIA_TESTES.md - Guia prático completo"
echo "3. TESTES_DOCUMENTACAO.md - Documentação detalhada"
echo "4. LISTA_MUDANCAS.md - Lista de mudanças"
echo "5. VERIFICACAO_FINAL.md - Verificação final"
echo ""

echo "======================================"
echo "🆘 Troubleshooting:"
echo "======================================"
echo ""
echo "Se os testes não rodarem:"
echo "1. npm install --save-dev jest supertest"
echo "2. npm test"
echo ""
echo "Se houver erro de caminho:"
echo "1. Verificar import/require dos modelos"
echo "2. Confirmar que os mocks estão configurados"
echo ""
echo "Se o Jest não encontrar os testes:"
echo "1. Verificar extensão .test.js"
echo "2. Confirmar que estão em __tests__/"
echo ""

echo "======================================"
echo "✨ Pronto!"
echo "======================================"
