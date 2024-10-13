import Veicolo from '../models/veicolo';
import moment from 'moment'; 

// Funzione per calcolare l'importo di una multa
export const calcolaImportoMulta = (veicolo: Veicolo, dataOraTransito: moment.Moment): number => {
  let baseRate = 50; 

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

  // Controlla la fascia oraria 
  const ora = dataOraTransito.hour();
  if ((ora >= 8 && ora <= 10) || (ora >= 17 && ora <= 19)) {
    baseRate += 20;  
  }

  // Controlla il giorno della settimana
  const giorno = dataOraTransito.day();  
  if (giorno === 0 || giorno === 6) {
    baseRate += 15;  
  }

  // Aggiunge una tariffa specifica per i giorni festivi
  if (festivo(dataOraTransito)) {
    baseRate += 25;  
  }

  return baseRate; 
};

const festivo = (data: moment.Moment): boolean => {
  const festeNazionali = [
    '01-01', 
    '25-12', 
    '01-05',
    '15-08',
  ];

  const giornoMese = data.format('DD-MM');
  return festeNazionali.includes(giornoMese);
};
