import ZTL from '../models/ztl';
import Varco from '../models/varco';
import Veicolo from '../models/veicolo';
import Transito from '../models/transito';
import Multa from '../models/multa';
import Whitelist from '../models/whitelist';
import Tariffa from '../models/tariffa';
import User from '../models/user';

const syncDb = async () => {
      await ZTL.sync();
      await Varco.sync();
      await Veicolo.sync();
      await Transito.sync();
      await Multa.sync();
      await Whitelist.sync();
      await Tariffa.sync();
      await User.sync();
};
  
export { ZTL, Varco,Veicolo, Transito, Multa, Whitelist, Tariffa, User, syncDb};