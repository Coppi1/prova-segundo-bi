import express from 'express';
import ContractController from '../controllers/ContractController';

const router = express.Router();

// Rota para listar todos os contratos de um cliente específico
router.get('/contracts/client/:clientId', async (req, res) => {
 try {
   await ContractController.listContractsByClient(req, res);
 } catch (error) {
   console.error("Error in /contracts/client/:clientId route:", error);
   res.status(500).json({ error: "An error occurred while fetching contracts for this client." });
 }
});

// Rota para listar todos os contratos
router.get('/contracts', async (req, res) => {
 try {
   await ContractController.listAllContracts(req, res);
 } catch (error) {
   console.error("Error in /contracts route:", error);
   res.status(500).json({ error: "An error occurred while fetching all contracts." });
 }
});

router.post("/create", async (req, res) => {
 try {
   await ContractController.createContract(req, res);
 } catch (error) {
   console.error("Error in route handler:", error);
   res.status(500).json({ error: "An error occurred while creating the contract." });
 }
});

export default router;
