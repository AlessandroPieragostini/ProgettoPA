# PROGETTO PROGRAMMAZIONE AVANZATA
![GESTIONE ZTL](./images/logo.png)

## Introduzione
Questo progetto ha come obiettivo la realizzazione di un sistema per la gestione delle multe derivanti dal passaggio di autoveicoli 
attraverso varchi ZTL (Zona a Traffico Limitato). 

## Installazione
Istruzioni su come installare e configurare il progetto:
```bash
# Clona il repository
git clone https://github.com/AlessandroPieragostini/ProgettoPA.git

# Vai nella cartella del progetto
cd ProgettoPA
```
## Struttura Progetto
```
ProgettoPA
├── database
│   ├── Dockerfile
│   ├── seed.sql
├── pagamenti_backend
│   ├── src
│   │   ├── controllers
│   │   ├── dao
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── static
│   │   ├── syncDB
│   │   ├── types
│   │   ├── utils
│   │   └── app.ts
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── backend-transiti
│   ├── src
│   │   ├── controllers
│   │   ├── dao
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── static
│   │   ├── syncDB
│   │   ├── types
│   │   ├── utils
│   │   └── app.ts
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├──.env
├──docker-compose.yml
└──tsconfig.json
```
