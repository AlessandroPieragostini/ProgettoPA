import QRCode from 'qrcode';

export const generateQRCode = async (data: string): Promise<string> => {
   try {
      const qrCode = await QRCode.toDataURL(data);
      return qrCode;
   } catch (error) {
      throw new Error('Error generating QR code');
   }
};
