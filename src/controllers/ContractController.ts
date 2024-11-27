import { Request, Response } from "express";
import sequelize from "../shared/connection";
import { QueryTypes } from "sequelize";
import Contract from "../models/Contract";

class ContractController {
  async listContractsByClient(req: Request, res: Response) {
    try {
      const { clientId } = req.params;

      if (!clientId) {
        return res.status(400).json({ error: "clientId is required." });
      }

      const parsedClientId = parseInt(clientId, 10);

      if (isNaN(parsedClientId)) {
        return res.status(400).json({ error: "Invalid clientId provided." });
      }

      console.log("Fetching contracts for clientId:", parsedClientId);

      const contracts = await sequelize.query(
        "SELECT * FROM contract WHERE client_id = :clientId ORDER BY operation_datetime DESC",
        {
          replacements: { clientId: parsedClientId },
          type: QueryTypes.SELECT,
        }
      );

      console.log("Contracts fetched:", contracts);

      if (contracts.length === 0) {
        return res
          .status(404)
          .json({ message: "No contracts found for this client." });
      }

      return res.status(200).json({
        message: "Contracts fetched successfully.",
        data: contracts,
      });
    } catch (error) {
      console.error("Error fetching contracts:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching contracts." });
    }
  }

  async listAllContracts(req: Request, res: Response) {
    try {
      console.log("Fetching all contracts");

      // Buscar todos os contratos na tabela contract
      const contracts = await Contract.findAll({
        order: [["operationDatetime", "DESC"]], // Ordena pela data de operação (descendente)
      });

      console.log("Contracts fetched:", contracts);

      if (contracts.length === 0) {
        return res.status(404).json({ message: "No contracts found." });
      }

      return res.status(200).json({
        message: "Contracts fetched successfully.",
        data: contracts,
      });
    } catch (error) {
      console.error("Error fetching contracts:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching contracts." });
    }
  }

  // Método para criar um novo contrato de teste
  async createContract(req: Request, res: Response) {
    try {
      const {
        clientId,
        contractorId,
        terms,
        status,
        operationDatetime,
        startDate,
        expirationDate,
      } = req.body;

      // Validação dos dados recebidos
      if (
        !clientId ||
        !contractorId ||
        !terms ||
        !status ||
        !operationDatetime ||
        !startDate ||
        !expirationDate
      ) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const contract = await Contract.create({
        clientId,
        contractorId,
        terms,
        status,
        operationDatetime: new Date(operationDatetime),
        startDate: new Date(startDate),
        expirationDate: new Date(expirationDate),
      });

      return res.status(201).json({
        message: "Contract created successfully.",
        data: contract,
      });
    } catch (error) {
      console.error("Error creating contract:", error);
      return res.status(500).json({ error: "An error occurred while creating the contract." });
    }
  }
}

export default new ContractController();
