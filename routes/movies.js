module.exports = function(app) {

  var filmes = {
    id: 1
    , titulo: "Alien o 8 passageiro"
    , diretor: "Ridley Scott"
  };

  app.get('/filmes', function(req, res){
    res.json(filmes);
  })
}
