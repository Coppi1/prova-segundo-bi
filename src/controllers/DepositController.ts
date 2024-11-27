import { Request, Response } from 'express';
import Deposit from '../models/Deposit';
import Client from '../models/Client';

class DepositController {
  async makeDeposit(req: Request, res: Response) {
    try {
      const { clientId, value } = req.body;

      // Verificar se os campos necessários foram passados
      if (!clientId || value === undefined) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Validar o clientId
      const parsedClientId = parseInt(clientId, 10);
      if (isNaN(parsedClientId)) {
        return res.status(400).json({ error: "Invalid clientId format." });
      }

      // Tente buscar o cliente no banco de dados
      const client = await Client.findOne({ where: { id: parsedClientId } });
      if (!client) {
        return res.status(404).json({ error: "Client not found." });
      }

      // Criar o depósito
      const deposit = await Deposit.create({
        clientId: parsedClientId,
        value,
        operation: new Date(),
      });

      // Atualizar o saldo do cliente
      client.balance = parseFloat(client.balance.toString()) + parseFloat(value.toString());
      await client.save();

      return res.status(201).json({
        message: "Deposit made successfully.",
        data: deposit,
      });
    } catch (error) {
      console.error('Error making deposit:', error);  // Verifique o erro completo
      return res.status(500).json({ error: "An error occurred while making the deposit." });
    }
  }
}

export default new DepositController();
