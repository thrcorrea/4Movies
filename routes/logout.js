module.exports = function(app) {
  app.get('/logout', function(req, res){
    if(req.isAuthenticated()){
      req.logout();
      res.sendStatus(204);
    } else {
      res.json({msg: "Usuário não está autenticado."})
    }
  });
}
