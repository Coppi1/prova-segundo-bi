import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection";

class Payment extends Model {
  public id!: number;
  public jobId!: number;
  public operationDateTime!: Date;
  public paymentValue!: number;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payment",
    underscored: true,
  }
);

export default Payment;
