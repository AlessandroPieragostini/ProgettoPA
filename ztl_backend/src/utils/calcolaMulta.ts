import Veicolo from '../models/veicolo';
import moment from 'moment';  // Libreria per la gestione delle date

// Funzione per calcolare l'importo della multa
export const calcolaImportoMulta = (veicolo: Veicolo, dataOraTransito: moment.Moment): number => {
  let baseRate = 50;  // Tariffa base della multa (puoi personalizzarla)

  // Modifica la tariffa in base al tipo di veicolo
  switch (veicolo.tipoVeicolo) {
    case 'elettrico':
      baseRate -= 10;  
      break;
    case 'benzina':
      baseRate += 35;  
      break;
    case 'diesel':
      baseRate += 30;  
      break;
    case 'ibrido':
        baseRate += 0;  
        break;
    case 'moto':
        baseRate += 5;  
        break;
    case 'furgone':
        baseRate += 50;  
        break;
    default:
      break;
  }

  // Controlla la fascia oraria (es. orari di punta)
  const ora = dataOraTransito.hour();
  if ((ora >= 8 && ora <= 10) || (ora >= 17 && ora <= 19)) {
    baseRate += 20;  // Sovrapprezzo per gli orari di punta
  }

  // Controlla il giorno della settimana
  const giorno = dataOraTransito.day();  // 0 = Domenica, 6 = Sabato
  if (giorno === 0 || giorno === 6) {
    baseRate += 15;  // Sovrapprezzo per il fine settimana (sabato/domenica)
  }

  // Se vuoi aggiungere una tariffa specifica per i giorni festivi
  if (èFestivo(dataOraTransito)) {
    baseRate += 25;  // Sovrapprezzo per i giorni festivi
  }

  return baseRate;  // Restituisce l'importo finale della multa
};

const èFestivo = (data: moment.Moment): boolean => {
  const festeNazionali = [
    '01-01', // Capodanno
    '25-12', // Natale
    '01-05', // Festa dei lavoratori
    '15-08', // Ferragosto
  ];

  const giornoMese = data.format('DD-MM');
  return festeNazionali.includes(giornoMese);
};
