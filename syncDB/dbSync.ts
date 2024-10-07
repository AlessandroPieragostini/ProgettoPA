import VarcoZTL from '../ztl_backend/src/models/ztl';
import Veicolo from '../ztl_backend/src/models/veicolo';
import Transito from '../ztl_backend/src/models/transito';
import Multa from '../ztl_backend/src/models/multa';
import Whitelist from '../ztl_backend/src/models/whitelist';
import Tariffa from '../ztl_backend/src/models/tariffa';
import User from '../ztl_backend/src/models/user';

const syncDb = async () => {
      await VarcoZTL.sync();
      await Veicolo.sync();
      await Transito.sync();
      await Multa.sync();
      await Whitelist.sync();
      await Tariffa.sync();
      await User.sync();
};
  
export { User, VarcoZTL, Veicolo, Transito, Multa, Whitelist, Tariffa };