# PROGETTO PROGRAMMAZIONE AVANZATA
![GESTIONE ZTL](./images/logo.png)

## Introduzione
Questo progetto, sviluppato per il corso di Programmazione Avanzata dell'Anno Accademico 2023/2024, ha come obiettivo la realizzazione di un sistema backend per la gestione delle Zone a Traffico Limitato (ZTL) di una città. Il sistema consente il monitoraggio dei transiti dei veicoli attraverso varchi ZTL, calcolando in modo automatico le multe per i veicoli che violano le restrizioni di accesso. Il progetto si articola in due backend distinti:

Backend di gestione transiti, che permette di monitorare i varchi ZTL, inserire i transiti dei veicoli, e calcolare automaticamente le multe in base alla tipologia del veicolo, alla fascia oraria e al giorno della settimana.
Backend di gestione pagamenti, che consente agli utenti di verificare e pagare le multe ricevute attraverso un sistema di crediti.
L'intero sistema è stato sviluppato utilizzando Node.js e Express, con Sequelize come ORM per l'integrazione con un database PostgreSQL. Il progetto adotta pratiche di sviluppo moderne, tra cui l'uso di Typescript, il pattern Model-View-Controller (MVC), e la containerizzazione tramite Docker, garantendo modularità, scalabilità e facilità di manutenzione.

In aggiunta, il sistema supporta l'autenticazione mediante JWT (JSON Web Tokens) per garantire l'accesso sicuro e autorizzato alle diverse rotte API, e include funzionalità di validazione e gestione degli errori attraverso middleware dedicati. 

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
├── ztl_backend
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
## PATTERN UTIIZZATI

### MVC

## DIAGRAMMI UML

### DIAGRAMMI DEI CASI D'USO

### DIAGRAMMI DELLE SEQUENZE

## STRUTTURA DATABASE
Il sistema utilizza **PostgreSQL** come RDBMS, il quale è particolarmente indicato per applicazioni backend come quella sviluppata in questo progetto, dove l'autenticazione sicura dei dati e l'efficienza nelle operazioni di lettura e scrittura sono fondamentali. Grazie alle sue prestazioni ottimizzate, PostgreSQL rappresenta una soluzione ideale per garantire la robustezza e la velocità del sistema.
![DATABASE](./images/database_schema.png)

## AUTORI 
| Nome e Cognome  | Email  |
|-------------|-------------|
| Marco Barbarella    | [s1119226@studenti.univpm.it](s1119226@studenti.univpm.it) |
| Alessandro Pieragostini    | [s1119377@studenti.univpm.it](s1119377@studenti.univpm.it)   |


