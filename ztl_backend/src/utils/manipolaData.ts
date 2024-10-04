export const getGiorno = (dateString: Date): string => {
    const date = new Date(dateString);
    const daysOfWeek = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    
    // Ottieni il giorno della settimana come un numero (0-6)
    const dayIndex = date.getDay();
  
    // Ritorna il nome del giorno della settimana
    return daysOfWeek[dayIndex];
  };
  
export const getOrario = (dateString: Date): string => {
    const date = new Date(dateString);

    // Ottieni l'ora, i minuti e i secondi
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Restituisci l'ora nel formato HH:MM:SS
    return `${hours}:${minutes}:${seconds}`;
    };
