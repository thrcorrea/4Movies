var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataType) {
  const Usuarios = sequelize.define("usuarios", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: function(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      isPassword: function(encodedPassword, password){
        return bcrypt.compareSync(password, encodedPassword);
      }
    }
  });

  return Usuarios;
}
