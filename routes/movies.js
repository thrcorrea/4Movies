module.exports = function(app) {
  const Filmes = app.db.models.filmes;

  function requerAutenticacao(req, res, next){
    if (!req.isAuthenticated()){
      res.json({msg: "Autenticação requerida"});
    } else {
      next();
    }
  };

  app.route("/filmes")
    .get(requerAutenticacao, function(req, res){
      if (req.query.titulo){
        Filmes.findOne({where: req.query})
          .then(function(result){
            if (result) {
              res.json(result);
            }else{
              res.sendStatus(404);
            }
          })
          .catch(function(error) {
            res.status(412).json({msg: error.message});
          });
      } else {
        Filmes.findAll()
          .then(function(filmes){
            res.json({filmes: filmes})
          })
          .catch(function(error) {
            res.status(412).json({msg: error.message});
          });
      }
    })
    .post(requerAutenticacao,function(req, res) {
      Filmes.create(req.body)
        .then(function(result){
          res.json(result)
        })
        .catch(function(error){
          res.status(412).json({msg: error.message});
        });
    });

  app.get("/filmes/disponiveis",requerAutenticacao, function(res, res){
    Filmes.findAll({where: ["quantidade > ?", 0]})
      .then(function(filmes){
        res.json({filmes: filmes})
      })
      .catch(function(error) {
        res.status(412).json({msg: error.message})
      });
  });

  app.route("/filmes/:id")
    .get(requerAutenticacao,function(req, res){
      Filmes.findOne({where: req.params})
        .then(function(result){
          if (result) {
            res.json(result);
          }else{
            res.sendStatus(404);
          }
        })
        .catch(function(error) {
          res.status(412).json({msg: error.message});
        });
    })
    .put(requerAutenticacao,function(req, res){
      Filmes.update(req.body, {where: req.params})
        .then(function(result) {
          res.sendStatus(204);
        })
        .catch(function(error){
          res.status(412).json({msg: error.message});
        });
    })
    .delete(requerAutenticacao,function(req, res){
      Filmes.destroy({where: req.params})
        .then(function(result) {
          res.sendStatus(204)
        })
        .catch(function(error) {
          res.sendStatus(412).json({msg: error.message});
        });
    });

  app.get("/filmes/:id/locarFilme", requerAutenticacao,function(req, res){
    Filmes.findOne({where: req.params})
      .then(function(filme){
        if (filme) {
          if (filme.quantidade > 0){
            filme.decrement('quantidade')
              .then(function(result){
                res.json({filme: filme, msg: "Alugado com sucesso"});
              })
              .catch(function(error) {
                res.sendStatus(412).json({msg: error.message});
              });
          } else {
            res.json({msg: "Filme insdisponível para locação"})
          }
        } else {
          res.sendStatus(404);
        }
      })
      .catch(function(error) {
        res.sendStatus(412).json({msg: error.message});
      });
  });

  app.get("/filmes/:id/devolverFilme",requerAutenticacao, function(req, res) {
    Filmes.findOne({where: req.params})
      .then(function(filme){
        if (filme) {
          filme.increment('quantidade')
            .then(function(result){
              res.json({filme: filme, msg: "Devolvido com sucesso"});
            })
            .catch(function(error) {
              res.sendStatus(412).json({msg: error.message});
            });
        } else {
          res.sendStatus(404);
        }
      })
      .catch(function(error) {
        res.sendStatus(412).json({msg: error.message});
      });
  });

};
