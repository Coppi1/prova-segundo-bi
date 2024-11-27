import { Request, Response } from "express";
import Job from "../models/Job";
import Payment from "../models/Payment";

class JobController {
  // Listar Jobs não pagos integralmente de um contrato
  async listUnpaidJobsByContract(req: Request, res: Response) {
    try {
      const { contractId } = req.params;

      // Validar o contractId
      if (!contractId) {
        return res.status(400).json({ error: "Missing contractId parameter." });
      }

      const parsedContractId = parseInt(contractId, 10);
      if (isNaN(parsedContractId)) {
        return res.status(400).json({ error: "Invalid contractId format." });
      }

      console.log(`Fetching unpaid jobs for contractId: ${parsedContractId}`);

      // Buscar todos os jobs relacionados ao contrato
      const jobs = await Job.findAll({
        where: { contractId: parsedContractId },
        include: {
          model: Payment,
          required: false, // Permitir jobs sem pagamentos
        },
      });

      if (!jobs || jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found for the given contract." });
      }

      // Filtrar jobs não pagos integralmente
      const unpaidJobs = jobs.filter((job) => {
        const totalPaid = job.Payments?.reduce((total, payment) => total + payment.paymentValue, 0) || 0;
        return totalPaid < job.price;
      });

      if (unpaidJobs.length === 0) {
        return res.status(404).json({ message: "No unpaid jobs found for this contract." });
      }

      console.log(`Unpaid jobs for contractId ${parsedContractId}:`, unpaidJobs);

      return res.status(200).json({
        message: "Unpaid jobs fetched successfully.",
        data: unpaidJobs,
      });
    } catch (error) {
      console.error("Error fetching unpaid jobs:", error);
      return res.status(500).json({ error: "An error occurred while fetching unpaid jobs." });
    }
  }
}

export default new JobController();
