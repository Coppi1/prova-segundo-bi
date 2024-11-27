import sequelize from "../shared/connection";
import Client from "../models/Client";
import Contract from "../models/Contract";
import Job from "../models/Job";
import Payment from "../models/Payment";

(async () => {
  try {
    // Sincronizar tabelas
    await sequelize.sync({ force: true });

    console.log("Database synchronized. Adding seeds...");

    // Adicionar clientes
    const clients = await Client.bulkCreate([
      { clientId: 1, firstName: "John", lastName: "Doe", profession: "Engineer", type: "Individual", balance: 1000 },
      { clientId: 2, firstName: "Jane", lastName: "Smith", profession: "Designer", type: "Individual", balance: 2000 },
    ]);

    console.log("Clients added.");

    // Adicionar contratos
    const contracts = await Contract.bulkCreate([
      {
        clientId: clients[0].id,
        contractorId: 1,
        terms: "Contract for engineering services.",
        status: "Active",
        operationDatetime: new Date(),
        startDate: new Date(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
      {
        clientId: clients[1].id,
        contractorId: 2,
        terms: "Contract for design services.",
        status: "Active",
        operationDatetime: new Date(),
        startDate: new Date(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
    ]);

    console.log("Contracts added.");

    // Adicionar Jobs (relacionados aos contratos)
    const jobs = await Job.bulkCreate([
      {
        contractId: contracts[0].id,
        description: "Engineering Job 1",
        dueDate: new Date(),
        price: 500,
        paid: false, // Não pago
      },
      {
        contractId: contracts[0].id,
        description: "Engineering Job 2",
        dueDate: new Date(),
        price: 700,
        paid: false, // Não pago
      },
      {
        contractId: contracts[1].id,
        description: "Design Job 1",
        dueDate: new Date(),
        price: 600,
        paid: false, // Não pago
      },
    ]);

    console.log("Jobs added.");

    // Adicionar Payments (só um pagamento para um job para simular pagamento parcial)
    await Payment.bulkCreate([
      {
        jobId: jobs[0].id,  // Pagamento do primeiro job
        operationDateTime: new Date(),
        paymentValue: 200, // Pagamento parcial
      },
      {
        jobId: jobs[2].id,  // Pagamento para o primeiro job de Design
        operationDateTime: new Date(),
        paymentValue: 300, // Pagamento parcial
      },
    ]);

    console.log("Payments added.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
})();
