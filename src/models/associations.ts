import Client from "./Client";
import Deposit from "./Deposit";
import Job from "./Job";
import Payment from "./Payment";

Job.hasMany(Payment, { foreignKey: "jobId" });
Payment.belongsTo(Job, { foreignKey: "jobId" });

Client.hasMany(Deposit, { foreignKey: "clientId" });
Deposit.belongsTo(Client, { foreignKey: "clientId" });
