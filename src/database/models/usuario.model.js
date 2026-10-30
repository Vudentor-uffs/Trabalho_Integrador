const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

	const Usuario = sequelize.define(
		"Usuario",
		{
			email: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			nome: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			senha: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "usuario",
			timestamps: false,
		},
	);

	Usuario.associate = function (models) {
		Usuario.belongsToMany(models.Permissao, {
			through: models.UsuarioPermissao,
			foreignKey: "email",
			otherKey: "id_permissao",
		});
	};

module.exports = Usuario;
