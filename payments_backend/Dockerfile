# src/Dockerfile (per il backend dei pagamenti)
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutti i file del progetto
COPY . .

# Compila TypeScript in JavaScript
RUN npm run build

# Espone la porta 4000 (o la porta che il tuo server dei pagamenti usa)
EXPOSE 4000

# Comando di avvio
CMD ["npm", "start"]
