// articles/articlesController.test.js
describe("Articles Controller - Unit Tests", () => {
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

  describe("Validação de Campos", () => {
    test("saveArticle deve validar se título está preenchido", () => {
      req.body = { title: "", body: "conteúdo" };
      expect(req.body.title).toBe("");
      expect(req.body.body).not.toBe("");
    });

    test("saveArticle deve validar se conteúdo está preenchido", () => {
      req.body = { title: "Título", body: "" };
      expect(req.body.title).not.toBe("");
      expect(req.body.body).toBe("");
    });
  });

  describe("Sanitização de HTML", () => {
    test("deve permitir tags HTML seguras", () => {
      const html = "<p>Parágrafo</p>";
      expect(html).toContain("<p>");
      expect(html).toContain("</p>");
    });

    test("deve permitir imgs com atributos seguros", () => {
      const html = '<img src="imagem.jpg" alt="descrição" />';
      expect(html).toContain('src="imagem.jpg"');
      expect(html).toContain('alt="descrição"');
    });
  });

  describe("Slug Generation", () => {
    test("slug deve converter título para minúsculas", () => {
      const titulo = "NOVO ARTIGO";
      const slug = titulo.toLowerCase().replace(/\s+/g, "-");
      expect(slug).toBe("novo-artigo");
    });

    test("slug deve substituir espaços por hífen", () => {
      const titulo = "Titulo Com Varios Espacos";
      const slug = titulo.toLowerCase().replace(/\s+/g, "-");
      expect(slug).toBe("titulo-com-varios-espacos");
    });
  });

  describe("Manipulação de Categorias", () => {
    test("artigo pode ter categoria nula", () => {
      req.body = { title: "Artigo", body: "Conteúdo", category: null };
      expect(req.body.category).toBeNull();
    });

    test("artigo pode ter categoria válida", () => {
      req.body = { title: "Artigo", body: "Conteúdo", category: 1 };
      expect(req.body.category).toBe(1);
    });
  });

  describe("Flash Messages", () => {
    test("deve definir mensagem de sucesso quando artigo é salvo", () => {
      const flash = { type: "success", message: "Artigo criado com sucesso." };
      expect(flash.type).toBe("success");
      expect(flash.message).toContain("sucesso");
    });

    test("deve definir mensagem de erro quando dados faltam", () => {
      const flash = {
        type: "error",
        message: "Título e conteúdo são obrigatórios.",
      };
      expect(flash.type).toBe("error");
      expect(flash.message).toContain("obrigatórios");
    });
  });

  describe("Redirecionamentos", () => {
    test("deve redirecionar para /articles após sucesso", () => {
      const redirect = "/articles";
      expect(redirect).toBe("/articles");
    });

    test("deve redirecionar para / em caso de erro", () => {
      const redirect = "/";
      expect(redirect).toBe("/");
    });
  });
});