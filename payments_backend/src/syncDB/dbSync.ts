import Fine from '../models/Fine';
import Multa from '../models/Multa';
import User from '../models/User';



const syncDb = async () => {
      await Fine.sync();     
      await Multa.sync();      
      await User.sync();
};
  
export { Fine, Multa, User, syncDb};