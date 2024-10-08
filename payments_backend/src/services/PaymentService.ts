import UserDao from '../dao/UserDao';

class PaymentService {
    async payFine(userId: number, fineAmount: number) {
        const user = await UserDao.findById(userId);
        if (!user) {
            throw new Error('Utente non trovato');
        }

        if (user.credit < fineAmount) {
            throw new Error('Credito insufficiente');
        }

        // Deduce il credito
        user.credit -= fineAmount;
        await user.save();

        return { success: true, remainingCredit: user.credit };
    }

    async rechargeUser(userId: number, amount: number) {
        const newCredit = await UserDao.rechargeCredit(userId, amount);
        if (newCredit === null) {
            throw new Error('Utente non trovato');
        }
        return { success: true, newCredit };
    }

    async checkUserCredit(userId: number) {
        const credit = await UserDao.checkCredit(userId);
        if (credit === null) {
            throw new Error('Utente non trovato');
        }
        return credit;
    }
}

export default new PaymentService();
