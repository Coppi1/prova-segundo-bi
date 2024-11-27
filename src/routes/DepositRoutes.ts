import express from 'express';
import DepositController from '../controllers/DepositController';

const router = express.Router();

router.post('/deposit', async (req, res) => {
  try {
    await DepositController.makeDeposit(req, res);
  } catch (error) {
    console.error("Error in /deposit route:", error);
    res.status(500).json({ error: "An error occurred while making the deposit." });
  }
});

export default router;
