module.exports = function(sequelize, DataType) {
  const Filmes = sequelize.define("Filmes", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type:  DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    diretor: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  return Filmes;
};
