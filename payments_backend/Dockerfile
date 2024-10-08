# Usa l'immagine base di Node.js
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia package.json e installa le dipendenze
COPY package*.json ./
RUN npm install

# Copia il codice sorgente
COPY . .

# Compila TypeScript
RUN npm run build

# Espone la porta dell'applicazione
EXPOSE 3000

# Esegue l'applicazione
CMD ["npm", "run", "start"]
