import PDFDocument from 'pdfkit';
import { Fine } from '../models/Fine';

export const createPDF = async (fine: Fine, qrCode: string): Promise<Buffer> => {
   return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      let buffers: any[] = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
         const pdfBuffer = Buffer.concat(buffers);
         resolve(pdfBuffer);
      });

      doc.text(`Targa: ${fine.licensePlate}`);
      doc.text(`Importo: €${fine.amount}`);
      doc.image(qrCode, { fit: [100, 100], align: 'center' });
      doc.end();
   });
};
