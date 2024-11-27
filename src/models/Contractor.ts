import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection";

class Contractor extends Model {
  public id!: number;
  public nome!: string;
}

Contractor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Contractor",
    tableName: "contractor",
    underscored: true,
  }
);

export default Contractor;
