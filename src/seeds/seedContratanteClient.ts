import sequelize from "../shared/connection";
import Client from "../models/Client";
import Contract from "../models/Contract";

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
    await Contract.bulkCreate([
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
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
})();
