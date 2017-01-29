var LocalStrategy = require("passport-local").Strategy;

module.exports = function(app,passport) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordFiled: 'password'
  },
  function(username, password, done){
    const Usuarios = app.db.models.usuarios;

    Usuarios.find({where: {nome: username }})
      .then(function(usuario){
        if (!usuario) {
          return done(null, false, {message: "O usuario não existe"});
        } else if (!Usuarios.isPassword(usuario.password, password )) {  //   password != usuario.password) {
          return done(null, false, {message: "Senha errada"});
        } else {
          return done(null, usuario);
        }
      })
      .catch(function(error) {
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
