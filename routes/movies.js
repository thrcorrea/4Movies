module.exports = function(app) {
  const Filmes = app.db.models.filmes;

  app.route("/filmes")
    .get(function(req, res){
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
    .post(function(req, res) {
      Filmes.create(req.body)
        .then(function(result){
          res.json(result)
        })
        .catch(function(error){
          res.status(412).json({msg: error.message});
        });
    });

  app.route("/filmes/:id")
    .get(function(req, res){
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
    .put(function(req, res){
      Filmes.update(req.body, {where: req.params})
        .then(function(result) {
          res.sendStatus(204);
        })
        .catch(function(error){
          res.status(412).json({msg: error.message});
        });
    })
    .delete(function(req, res){
      Filmes.destroy({where: req.params})
        .then(function(result) {
          res.sendStatus(204)
        })
        .catch(function(error) {
          res.sendStatus(412).json({msg: error.message});
        });
    });

};
