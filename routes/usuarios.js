module.exports = function(app){
  const Usuarios = app.db.models.usuarios;

  function requerAutenticacao(req, res, next){
    if (!req.isAuthenticated()){
      res.json({msg: "Autenticação requerida"});
    } else {
      next();
    }
  };

  app.get("/usuarios/:id", requerAutenticacao, function(req, res) {
    Usuarios.findById(req.params.id, {
      attributes: ["id", "nome", "email"]
    })
    .then(function(result){
      res.json(result)
    })
    .catch(function(error){
      res.status(412).json({msg: error.message});
    });
  });

  app.delete("/usuarios/:id", requerAutenticacao, function(req, res){
    Usuarios.destroy({where: {id: req.params.id}})
      .then(function(result){
        res.sendStatus(204)
      })
      .catch(function(error){
        res.status(412).json({msg: error.message});
      });
  });

  app.post("/usuarios", function(req, res){
    Usuarios.create(req.body)
      .then(function(result){
        res.json(result);
      })
      .catch(function(error) {
        res.status(412).json({msg: error.message});
      });
  });
}
