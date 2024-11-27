import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection";

class Contract extends Model {
  public id!: number;
  public clientId!: number;
  public contractorId!: number;
  public terms!: string;
  public status!: string;
  public operationDatetime!: Date;
  public startDate!: Date;
  public expirationDate!: Date;
}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contractorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    terms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operationDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Contract",
    tableName: "contract",
    underscored: true,
  }
);

export default Contract;
