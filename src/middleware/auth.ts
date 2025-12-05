export default function ensureAuth(req: any, res: any, next: any) {
  // Se session existir e userId definido, continua
  if (req.session && req.session.userId) {
    // opcionalmente popular res.locals.user para views
    res.locals.currentUser = {
      id: req.session.userId,
      name: req.session.userName,
      email: req.session.userEmail
    };
    return next();
  }

  // caso não autenticado, redireciona para /
  // Em um fluxo mais refinado, redirecionar para login ou retornar 401 se API
  req.session.returnTo = req.originalUrl;
  return res.redirect("/");
};