import PDFDocument from 'pdfkit';
import { Response } from 'express';
import Multa from '../models/multa'; // Assicurati che il modello Multa sia correttamente importato
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid'; // Per generare UUID
import QRCode from 'qrcode';

// Funzione per generare il PDF
export const generatePDF = async (multa: Multa) => {
  const doc = new PDFDocument();
  
  // Crea un buffer per il PDF
  const buffers: Buffer[] = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => { 
    const pdfData = Buffer.concat(buffers);
    return pdfData;
  });

  // Aggiungi contenuto al PDF
  doc.fontSize(25).text('Bollettino di Pagamento', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Targa: ${multa.targaVeicolo}`, { align: 'left' });
  doc.text(`Importo: €${multa.importo}`, { align: 'left' });
  doc.text(`ID Multa: ${multa.id}`, { align: 'left' });
  doc.text(`UUID Pagamento: ${multa.uuidPagamento}`, { align: 'left' }); // Genera UUID per il pagamento
  doc.moveDown();

  // Genera un QR Code (puoi usare una libreria esterna per generare il QR code se necessario)
  // Ad esempio, usando `qrcode`:
  const qrCode = await QRCode.toDataURL(`${multa.uuidPagamento}|${multa.id}|${multa.targaVeicolo}|${multa.importo}`);
  doc.image(qrCode, { fit: [100, 100], align: 'center' });

  // Finalizza il PDF
  doc.end();
  
  // Restituisci il buffer del PDF
  return new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
    doc.on('error', reject);
  });
};
