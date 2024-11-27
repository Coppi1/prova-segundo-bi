import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection";
import Payment from "./Payment";

class Job extends Model {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public dueDate!: Date;
  public price!: number;
  public paid!: boolean;
  public Payments?: Payment[];
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contractId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Job",
    tableName: "job",
    underscored: true,
  }
);

export default Job;
