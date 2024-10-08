import Fine from '../models/Fine';
import Multa from '../models/Multa';
import User from '../models/User';
import Veicolo from '../models/Veicolo';


const syncDb = async () => {
      await Fine.sync();     
      await Multa.sync();      
      await User.sync();
      await Veicolo.sync();
};
  
export { Fine, Multa, User, Veicolo, syncDb};