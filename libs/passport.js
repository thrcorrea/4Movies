var LocalStrategy = require("passport-local").Strategy;

module.exports = function(app,passport) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordFiled: 'password'
  },
  function(username, password, done){
    console.log("iniciou strategia");
    const Usuarios = app.db.models.usuarios;
    console.log("usuario " + username);

    Usuarios.find({where: {nome: username }})
      .then(function(usuario){
        console.log("usuario " + usuario.nome);
        console.log("senha " + usuario.password);
        console.log("senha requisicao " + password);
        if (!usuario) {
          return done(null, false, {message: "O usuario não existe"});
        } else if (password != usuario.password) {
          return done(null, false, {message: "Senha errada"});
        } else {
          return done(null, usuario);
        }
      })
      .catch(function(error) {
        console.log("erro na estrategia");
        return done(error);
      });
    }
  ));

  passport.serializeUser(function(usuario, done){
    done(null, usuario.id);
  });

  passport.deserializeUser(function(id, done){
    const Usuarios = app.db.models.usuarios;

    Usuarios.findById(id)
      .then(function(usuario){
        done(null, usuario);
      })
      .catch(function(error){
        done(new Error('Usuario ' + id + ' não existe'));
      });
  });
}
