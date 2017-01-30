var bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
var passport = require("passport");
var cookieParser = require('cookie-parser');

module.exports = function(app){
  app.set("port", 3000);
  app.set("json spaces", 4);

  require('./passport.js')(app,passport);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  //não se deve utilizar esta linha de codigo em codigo de produção, o segredo da sessão não deve ser exposto;
  app.use(session({ secret: "segredo"}));

  app.use(passport.initialize());
  app.use(passport.session());


  app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
      if(err) { return next(err);}
      if (!user) { return res.json({msg: "usuario não autenticado"});}
      req.login(user, function(err) {
        if (err) { return next(err);}
        return res.json({msg: "usuario autenticado " + user.nome});
      });
    })(req, res, next);
  });

  app.use(function(req, res, next) {
    delete req.body.id;
    next();
  });
};
