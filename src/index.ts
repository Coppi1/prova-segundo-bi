import dotenv from "dotenv";
import express from "express";
import "./models/associations"; // Supondo que você tem associações definidas
// import clientRoutes from "./routes/clientRoutes";
import contractRoutes from "./routes/ContractRoutes";
// import contractorRoutes from "./routes/contractorRoutes";
import depositRoutes from "./routes/DepositRoutes";
// import jobRoutes from "./routes/jobRoutes";
// import paymentRoutes from "./routes/paymentRoutes";
import sequelize from "./shared/connection";
import bodyParser from 'body-parser';

// Carrega as variáveis do arquivo .env
dotenv.config();

// Criação do app Express
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal de teste
app.get("/", (req, res) => {
  res.status(200).send("API server ON");
});

// Registro das rotas
//app.use("/clients", clientRoutes);
app.use(contractRoutes);
app.use(depositRoutes);
// app.use("/contractors", contractorRoutes);
// app.use("/deposits", depositRoutes);
// app.use("/jobs", jobRoutes);
// app.use("/payments", paymentRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); 
    console.log("Models synchronized with the database.");

    // sequelize.sync({ force: false }) 
    //   .then(() => {
    //     console.log('Models synchronized with the database.');
    //   })
    //   .catch((error) => console.error('Error syncing database:', error));

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default app;
