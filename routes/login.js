// module.exports = function(app) {
//   app.route("/login")
//     .post(function(req, res, next){
//       const passport = app.passport;
//       passport.authenticate('local', function(err, usuario, info){
//         if (err) {
//           next(err);
//         }
//
//         if (!usuario) {
//           res.sendStatus(412).json({msg: "erro ao logar"});
//         }
//
//         req.logIn(usuario, function(err) {
//           if (err) {
//             next(err);
//           }
//           res.sendStatus(200).json({msg: "Login bem sucedido"});
//         });
//       });
//     })
//     .get(function(req, res){
//       res.json({msg: "rota de login"});
//     })
// };
