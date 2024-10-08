import Multa from '../models/Multa';

class MultaDao {
    async findById(id: number) {
        return await Multa.findByPk(id);
    }

    async updatePaymentStatus(multaId: number, status: boolean) {
        const multa = await this.findById(multaId);
        if (multa) {
            multa.pagamentoEffettuato = status;
            await multa.save();
            return multa;
        }
        return null;
    }
}

export default new MultaDao();
