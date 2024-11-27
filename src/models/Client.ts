import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection";

class Client extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public profession!: string;
  public type!: string;
  public balance!: number;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "client",
    underscored: true,
    timestamps: true,
  }
);

export default Client;
