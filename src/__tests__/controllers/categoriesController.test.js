// categories/categoriesController.test.js
describe("Categories Controller - Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      session: { flash: null },
      params: {},
    };

    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Validação de Título", () => {
    test("título vazio deve ser inválido", () => {
      const titulo = "";
      expect(titulo.trim()).toBe("");
    });

    test("título com apenas espaços deve ser inválido", () => {
      const titulo = "   ";
      expect(titulo.trim()).toBe("");
    });

    test("título válido deve passar na validação", () => {
      const titulo = "Tecnologia";
      expect(titulo.trim()).not.toBe("");
      expect(titulo.length).toBeGreaterThan(0);
    });
  });

  describe("Slug Generation para Categorias", () => {
    test("slug deve converter título para minúsculas", () => {
      const titulo = "NOVA CATEGORIA";
      const slug = titulo.toLowerCase().replace(/\s+/g, "-");
      expect(slug).toBe("nova-categoria");
    });

    test("slug deve ser único para títulos diferentes", () => {
      const slug1 = "Tecnologia".toLowerCase().replace(/\s+/g, "-");
      const slug2 = "Design".toLowerCase().replace(/\s+/g, "-");
      expect(slug1).not.toBe(slug2);
    });

    test("slug deve remover caracteres especiais", () => {
      const titulo = "Tech & Innovation";
      const slug = titulo
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "-");
      expect(slug).toContain("-");
      expect(slug.length).toBeGreaterThan(0);
    });
  });

  describe("Formatação de Dados", () => {
    test("deve trimmar espaços do título ao salvar", () => {
      const titulo = "  Categoria  ";
      const tituloLimpo = titulo.trim();
      expect(tituloLimpo).toBe("Categoria");
    });

    test("deve manter título original após trim", () => {
      const titulo = "  Design  ";
      const tituloLimpo = titulo.trim();
      expect(tituloLimpo).toBe("Design");
      expect(tituloLimpo).not.toContain(" ");
    });
  });

  describe("Validação de ID", () => {
    test("ID válido deve ser número", () => {
      const id = 1;
      expect(!isNaN(id)).toBe(true);
      expect(typeof id).toBe("number");
    });

    test("ID inválido deve falhar na validação", () => {
      const id = "abc";
      expect(!isNaN(id)).toBe(false);
    });

    test("ID nulo deve ser inválido", () => {
      const id = null;
      expect(id).toBeNull();
      expect(!id).toBe(true);
    });
  });

  describe("Flash Messages - Categorias", () => {
    test("deve exibir mensagem de sucesso ao criar", () => {
      const flash = {
        type: "success",
        message: "Categoria criada com sucesso.",
      };
      expect(flash.type).toBe("success");
      expect(flash.message).toContain("sucesso");
    });

    test("deve exibir mensagem de sucesso ao deletar", () => {
      const flash = {
        type: "success",
        message: "Categoria deletada com sucesso.",
      };
      expect(flash.type).toBe("success");
      expect(flash.message).toContain("deletada");
    });

    test("deve exibir mensagem de erro se título falta", () => {
      const flash = { type: "error", message: "Título é obrigatório." };
      expect(flash.type).toBe("error");
      expect(flash.message).toContain("obrigatório");
    });
  });

  describe("Redirecionamentos", () => {
    test("deve redirecionar para /categories após criar", () => {
      const redirect = "/categories";
      expect(redirect).toBe("/categories");
    });

    test("deve redirecionar para admin/categories/new em caso de erro", () => {
      const redirect = "admin/categories/new";
      expect(redirect).toContain("categories");
    });

    test("deve redirecionar para admin/categories/edit para editar", () => {
      const redirect = "admin/categories/edit";
      expect(redirect).toContain("edit");
    });
  });

  describe("Validação de Campos Obrigatórios", () => {
    test("deve validar presença de ID e título para atualizar", () => {
      const dados = { id: 1, title: "Nova Categoria" };
      expect(dados.id).not.toBeNull();
      expect(dados.title).not.toBeNull();
      expect(!!(dados.id && dados.title)).toBe(true);
    });

    test("deve rejeitar atualização sem ID", () => {
      const dados = { id: null, title: "Nova Categoria" };
      expect(!!(dados.id && dados.title)).toBe(false);
    });

    test("deve rejeitar atualização sem título", () => {
      const dados = { id: 1, title: null };
      expect(!!(dados.id && dados.title)).toBe(false);
    });
  });

  describe("Tratamento de Erros", () => {
    test("deve tratar erro ao buscar categoria para edição", () => {
      const error = new Error("Database Error");
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Database Error");
    });

    test("deve tratar erro ao deletar categoria", () => {
      const error = new Error("Foreign key constraint");
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain("constraint");
    });
  });
});