module.exports = function(app) {
  app.db.sequelize.sync().done( function() {
    app.listen(app.get("port"), function(){
      console.log("4movies escutando na porta " + app.get("port"));
    });
  });
};
