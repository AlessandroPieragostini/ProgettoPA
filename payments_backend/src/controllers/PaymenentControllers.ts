import { Request, Response } from 'express';
import PaymentService from '../services/PaymentService';

class PaymentController {
    async payFine(req: Request, res: Response) {
        const { userId, multaId } = req.body;
        try {
            const result = await PaymentService.payFine(userId, multaId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async rechargeCredit(req: Request, res: Response) {
        const { userId, amount } = req.body;
        try {
            const result = await PaymentService.rechargeUser(userId, amount);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async checkCredit(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const credit = await PaymentService.checkUserCredit(parseInt(userId));
            res.status(200).json({ credit });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PaymentController();
