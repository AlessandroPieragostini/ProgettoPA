import User from '../models/User';

class UserDao {
    async findById(id: number) {
        return await User.findByPk(id);
    }

    async updateCredit(id: number, newCredit: number) {
        const user = await this.findById(id);
        if (user) {
            user.credit = newCredit;
            await user.save();
            return user;
        }
        return null;
    }

    async checkCredit(id: number) {
        const user = await this.findById(id);
        if (user) {
            return user.credit;
        }
        return null;
    }

    async rechargeCredit(id: number, amount: number) {
        const user = await this.findById(id);
        if (user) {
            user.credit += amount;
            await user.save();
            return user.credit;
        }
        return null;
    }
}

export default new UserDao();
