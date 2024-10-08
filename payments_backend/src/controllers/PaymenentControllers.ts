import { Request, Response } from 'express';
import { User } from '../models/User';  
import { Fine } from '../models/Fine';  
import { generateQRCode } from '../utils/qrcode';  
import { createPDF } from '../utils/pdf';  

// Funzione per ricaricare il credito (solo admin)
export const rechargeCredit = async (req: Request, res: Response) => {
   try {
      const { userId, amount } = req.body;
      const user = await User.findByPk(userId);
      if (!user || user.role !== 'admin') {
         return res.status(403).json({ error: 'Unauthorized' });
      }
      user.credit += amount;
      await user.save();
      res.json({ message: 'Credit recharged successfully' });
   } catch (error) {
      res.status(500).json({ error: 'Error recharging credit' });
   }
};

// Funzione per verificare il credito
export const checkCredit = async (req: Request, res: Response) => {
   try {
      const userId = req.user.id;  // Assuming req.user is populated by checkJWT middleware
      const user = await User.findByPk(userId);
      if (!user) {
         return res.status(404).json({ error: 'User not found' });
      }
      res.json({ credit: user.credit });
   } catch (error) {
      res.status(500).json({ error: 'Error checking credit' });
   }
};

// Funzione per pagare una multa
export const payFine = async (req: Request, res: Response) => {
   try {
      const { fineId, paymentUuid } = req.body;
      const userId = req.user.id;
      const fine = await Fine.findByPk(fineId);
      const user = await User.findByPk(userId);

      if (!fine || !user) {
         return res.status(404).json({ error: 'Fine or user not found' });
      }

      if (user.credit < fine.amount) {
         return res.status(400).json({ error: 'Insufficient credit' });
      }

      // Deduct credit and mark fine as paid
      user.credit -= fine.amount;
      fine.paid = true;
      fine.paymentUuid = paymentUuid;
      await user.save();
      await fine.save();

      res.json({ message: 'Fine paid successfully' });
   } catch (error) {
      res.status(500).json({ error: 'Error paying fine' });
   }
};

// Funzione per scaricare la ricevuta di pagamento in PDF
export const downloadReceipt = async (req: Request, res: Response) => {
   try {
      const { uuid } = req.params;
      const fine = await Fine.findOne({ where: { paymentUuid: uuid } });

      if (!fine) {
         return res.status(404).json({ error: 'Fine not found' });
      }

      const qrCode = await generateQRCode(`${uuid}|${fine.id}|${fine.licensePlate}|${fine.amount}`);
      const pdfBuffer = await createPDF(fine, qrCode);

      res.setHeader('Content-Disposition', `attachment; filename=receipt_${uuid}.pdf`);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
   } catch (error) {
      res.status(500).json({ error: 'Error downloading receipt' });
   }
};
