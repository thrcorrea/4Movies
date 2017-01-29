var bodyParser = require("body-parser");

module.exports = function(app){
  app.set("port", 3000);
  app.set("json spaces", 4);
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    delete req.body.id;
    next();
  });
};
