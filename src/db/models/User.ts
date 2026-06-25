import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/sequelize";

class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'user',
    paranoid: true,
    timestamps: true,
  },
);

export default User;
