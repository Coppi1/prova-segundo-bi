import express from "express";
import JobController from "../controllers/JobController";

const router = express.Router();

// Rota para listar Jobs não pagos integralmente de um contrato
router.get("/jobs/contract/:contractId/unpaid", async (req, res) => {
  try {
    await JobController.listUnpaidJobsByContract(req, res);
  } catch (error) {
    console.error("Error in /jobs/contract/:contractId/unpaid route:", error);
    res.status(500).json({ error: "An error occurred while fetching unpaid jobs." });
  }
});

export default router;
