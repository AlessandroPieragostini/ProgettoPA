import ZTL from '../models/ztl';
import Varco from '../models/varco';
import Veicolo from '../models/veicolo';
import Transito from '../models/transito';
import Multa from '../models/multa';
import Whitelist from '../models/whitelist';
import User from '../models/user';

// Funzione per sincronizzare i modelli con il database
const syncDb = async () => {
      await ZTL.sync();
      await Varco.sync();
      await Veicolo.sync();
      await Transito.sync();
      await Multa.sync();
      await Whitelist.sync();
      await User.sync();
};

// Esportazione dei modelli e della funzione syncDb per essere utilizzati in altre parti dell'applicazione
export { ZTL, Varco,Veicolo, Transito, Multa, Whitelist, User, syncDb};