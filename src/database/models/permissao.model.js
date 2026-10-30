const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

	const Permissao = sequelize.define(
		"Permissao",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
			},
			descricao: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "permissao",
			timestamps: false,
		},
	);

	Permissao.associate = function (models) {
		Permissao.belongsToMany(models.Usuario, {
			through: models.UsuarioPermissao,
			foreignKey: "id_permissao",
			otherKey: "email",
		});
	};

module.exports = Permissao;
