import { DataTypes } from "sequelize";
import { Migration } from "../lib/umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable('users', {
    id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
      autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  });
}

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.dropTable('users');
};
