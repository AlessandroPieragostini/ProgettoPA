// Funzione per ottenere il giorno della settimana da una data
export const getGiorno = (dateString: Date): string => {
  const date = new Date(dateString);
  const daysOfWeek = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
};

// Funzione per ottenere l'orario da una data
export const getOrario = (dateString: Date): string => {
  const date = new Date(dateString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
