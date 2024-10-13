# PROGETTO PROGRAMMAZIONE AVANZATA
![GESTIONE ZTL](./images/logo.png)

# Indice

- [Progetto Programmazione Avanzata](#progetto-programmazione-avanzata)
- [Indice](#Indice)
- [Obiettivo](#Obiettivo)
- [Installazione](#installazione)
- [Struttura Progetto](#struttura-progetto)
- [Pattern Utilizzati](#pattern-utilizzati)
- [Diagrammi UML](#diagrammi-uml)
- [Rotte API](#rotte-api)
- [Strumenti Utilizzati](#strumenti-utilizzati)
- [Autori](#autori) 


## Obiettivo
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

# Importa il file '.env' all'interno della directory principale 

# Avvia il progetto (assicurandoti di aver precendentemente installato Docker e docker-compose)
docker-compose up --build

#L'applicazione ora è in ascolto all'indirizzo http://127.0.0.1:3000
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
├──README.md
└──tsconfig.json
```
## Pattern Utilizzati
Durante lo sviluppo del progetto, abbiamo adottato diversi design patterns per garantire un'architettura solida, scalabile e manutenibile. Di seguito vengono descritti i principali pattern utilizzati e le motivazioni dietro la loro scelta.
### 1. **Model-View-Controller (MVC)**

Il pattern **Model-View-Controller (MVC)**  è stato utilizzato per strutturare l'applicazione in modo da separare la logica di business, la gestione dei dati e la presentazione:

- **Model**: Gestisce l'accesso ai dati e la rappresentazione degli oggetti del database tramite **Sequelize**, garantendo una mappatura chiara delle entità come ZTL, Varco, Veicolo, e Transito.
- **Controller**: Contiene la logica applicativa, orchestrando le operazioni tra i modelli e le rotte API per gestire le richieste dell'utente (come l'inserimento dei transiti o il calcolo delle multe).
- **View**: gestisce le interazioni tra l'utente e il sistema. I controller ricevono le richieste HTTP, chiamano i servizi appropriati e restituiscono i risultati. Per fornire una visualizzazione dei dati si utilizza **Postman** che restituisce dati in formato JSON.

L'adozione del pattern MVC facilita l'espandibilità del progetto e la sua manutenzione nel lungo termine.

### 2. **Data Access Object (DAO)**

Il pattern **DAO (Data Access Object)** è stato utilizzato per astrarre l'accesso ai dati. Questo approccio consente di isolare completamente il codice della logica applicativa dall'accesso ai dati, facilitando la sostituzione del meccanismo di persistenza senza influenzare altre parti del sistema. Le entità `Varco`, `Transito`, `Veicolo`, `Multa` e `Utente`  ha il proprio DAO, che esegue le operazioni richieste dall'applicazione.

L'uso del pattern DAO ha garantito una forte modularità, migliorando la manutenibilità e la testabilità del codice.

### 3. **Chain of Responsibility (CoR)**

Il pattern **Chain of Responsibility** è stato adottato attraverso i **middleware** di **Express.js** per gestire in modo efficiente le richieste HTTP. Ogni middleware svolge un compito specifico, come l'autenticazione, la validazione delle richieste o la gestione degli errori, e può passare il controllo al successivo middleware nella catena. In particolare, sono stati implementati:

- **Middleware di autenticazione**: Verifica se l'utente è autenticato tramite JWT e, in caso contrario, interrompe la catena.
- **Middleware di validazione**: Verifica la correttezza dei dati inviati nelle richieste API.
- **Middleware di gestione degli errori**: Cattura eventuali errori e sfrutta l'errorHandler descritto nel pattern Factory.

L'utilizzo di questo pattern ha migliorato l'efficienza del flusso delle richieste, garantendo che ogni operazione venga eseguita in modo ordinato e sicuro.

### 4. **Factory Pattern**

Il pattern **Factory** è stato utilizzato per la gestione centralizzata degli errori tramite la creazione di errori personalizzati. L'uso di una **Error Factory** consente di generare istanze di errori HTTP in modo dinamico, semplificando la gestione e l'estensione delle classi di errore. Questo approccio è particolarmente utile per la gestione di risposte standardizzate per errori come l'autenticazione fallita, la validazione dei dati, o l'accesso non autorizzato.

Grazie a questo pattern, la gestione degli errori è risultata centralizzata, modulare e facilmente estendibile.

### 5. **Singleton Pattern**

Il pattern **Singleton** è stato utilizzato per gestire componenti che devono essere istanziati una sola volta durante il ciclo di vita dell'applicazione:

Connessione al database: la connessione a Sequelize è gestita come un singleton, garantendo che esista una sola connessione attiva, migliorando l'efficienza dell'applicazione.
Configurazione delle chiavi JWT: la gestione delle chiavi segrete per la firma dei token JWT è centralizzata in un singleton per garantire un accesso sicuro e uniforme in tutta l'applicazione.

L'adozione di questi design pattern ha permesso di sviluppare un sistema robusto, manutenibile e scalabile, rispondendo efficacemente ai requisiti del progetto e facilitando future estensioni.

## Diagrammi UML

### Diagrammi dei casi d'uso

Nel sistema sviluppato, ci sono quattro tipologie di utenti principali: Utente, Operatore, Admin, e Varco. Ciascuna di queste entità interagisce con il sistema per svolgere determinate operazioni.

- **Utente**: Può autenticarsi, visualizzare eventuali multe a suo carico. Può anche scaricare il bollettino per il pagamento, effettuare i pagamenti delle multe e stampare le ricevute associate ad essi.

- **Operatore**: Ha il compito di monitorare e gestire le CRUD per i varchi, le ZTL e i transiti.

- **Admin**: Si occupa della ricarica del credito di un utente.

- **Varco**: È abilitato a registrare un transito.

![CASI_D_USO](./images/Casi_d_uso.png)

### Diagrammi delle sequenze

## Database Schema

Il sistema utilizza **PostgreSQL** come RDBMS, il quale è particolarmente indicato per applicazioni backend come quella sviluppata in questo progetto, dove l'autenticazione sicura dei dati e l'efficienza nelle operazioni di lettura e scrittura sono fondamentali. Grazie alle sue prestazioni ottimizzate, PostgreSQL rappresenta una soluzione ideale per garantire la robustezza e la velocità del sistema.

![DATABASE](./images/database_schema.png)

## Rotte API

| Tipo    | Rotta                        | Autenticazione  | Autorizzazione         |
|---------|------------------------------|-----------------|------------------------|
| *POST*    | `/login`                   | NO              |                        |
| *GET*     | `/varco`                   | SI              | Operatore              |
| *GET*     | `/varco/:id`               | SI              | Operatore              |
| *POST*    | `/varco`                   | SI              | Operatore              |
| *PUT*     | `/varco/:id`               | SI              | Operatore              |
| *DELETE*  | `/varco/:id`               | SI              | Operatore              |
| *GET*     | `/ztl`                     | SI              | Operatore              |
| *GET*     | `/ztl/:id`                 | SI              | Operatore              |
| *POST*    | `/ztl`                     | SI              | Operatore              |
| *PUT*     | `/ztl/:id`                 | SI              | Operatore              |
| *DELETE*  | `/ztl/:id`                 | SI              | Operatore              |
| *GET*     | `/transito/:id`            | SI              | Operatore              |
| *GET*     | `/transito/veicolo/:id`    | SI              | Operatore              |
| *GET*     | `/transito/varco/:id`      | SI              | Operatore              |
| *POST*    | `/transito`                | SI              | Operatore, Varco       |
| *PUT*     | `/transito/:id`            | SI              | Operatore              |
| *DELETE*  | `/transito/:id`            | SI              | Operatore              |
| *GET*     | `/multe/:id`               | SI              | Utente                 |
| *GET*     | `/multe/download/:id`      | SI              | Utente                 |
| *PUT*     | `/pagamento/:uuidPagamento`            | SI  | Utente                 |
| *GET*     | `/pagamento/ricevuta/:uuidPagamento`   | SI  | Utente                 |
| *GET*     | `/crediti`                 | SI              | Utente                 |
| *PUT*     | `/crediti/ricarica/:userId`| SI              | Utente                 |

## Login

**Radice URL**: `http://127.0.0.1:3000`

**Autenticazione**: Bearer {loginToken}

**Script post-request**: 
```javascript
pm.test("Save token", function () {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set("loginToken", jsonData.token);
    } else {
        console.log("Token not found in the response");
    }
});
```

### login_operatore

**Rotta**: `/login?email=john@example.com`

**Metodo**: `POST`

**Scopo**: Effettua il login come operatore.

**Body** (JSON): NO

**Output**:
```json

```

### login_admin

**Rotta**: `/login?email=alice@example.com`

**Metodo**: `POST`

**Scopo**: Effettua il login come admin.

**Body** (JSON): NO

**Output**:
```json

```

### login_utente

**Rotta**: `/login?email=jane@example.com`

**Metodo**: `POST`

**Scopo**: Effettua il login come utente.

**Body** (JSON): NO

**Output**:
```json

```

## Back-end ZTL

**Radice URL**: `http://127.0.0.1:3000`

**Autenticazione**: Bearer {loginToken}

### getZTLById

**Rotta**: `/ztl/:id`

**Metodo**: `GET`

**Scopo**: Recupera una Zona Traffico Limitato (ZTL) specificata dall'ID.

**Body** (JSON): NO

**Output**:
```json
{
  "id": 1,
  "nome": "Zona Traffico Limitato Centro",
  "descrizione": "Area ZTL nel centro della città.",
  "orarioInizio": "08:00",
  "orarioFine": "18:00",
  "giorniAttivi": ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]
}

```

### getZTLs

**Rotta**: `/ztl`

**Metodo**: `GET`

**Scopo**: Recupera tutte le ZTL.

**Body** (JSON): NO

**Output**:
```json


```

### createZTL

**Rotta**: `/ztl`

**Metodo**: `POST`

**Scopo**: Crea una nuova Zona Traffico Limitato (ZTL).

**Body** (JSON):
```json
{
  "nome": "Zona Traffico Limitato Centro",
  "descrizione": "Area ZTL nel centro della città, valida per traffico limitato nei giorni lavorativi.",
  "orarioInizio": "08:00",
  "orarioFine": "18:00",
  "giorniAttivi": ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]
}

```

**Output**:
```json
{
  "id": 1,
  "nome": "Zona Traffico Limitato Centro",
  "descrizione": "Area ZTL nel centro della città.",
  "orarioInizio": "08:00",
  "orarioFine": "18:00",
  "giorniAttivi": ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]
}

```

### updateZTL

**Rotta**: `/ztl/:id`

**Metodo**: `PUT`

**Scopo**: Aggiorna una Zona Traffico Limitato (ZTL) esistente.

**Body** (JSON):
```json
{
  "nome": "Zona Traffico Limitato Centro",
  "descrizione": "Area ZTL nel centro della città, valida per traffico limitato nei giorni lavorativi.",
  "orarioInizio": "08:00",
  "orarioFine": "18:00",
  "giorniAttivi": ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]
}

```

**Output**:
```json
{
  "id": 1,
  "nome": "Zona Traffico Limitato Centro",
  "descrizione": "Area ZTL nel centro della città.",
  "orarioInizio": "08:00",
  "orarioFine": "18:00",
  "giorniAttivi": ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]
}

```

### deleteZTL

**Rotta**: `/ztl/:id`

**Metodo**: `DELETE`

**Scopo**: Elimina una Zona Traffico Limitato (ZTL) specificata dall'ID.

**Body** (JSON): NO

**Output**:
```json

```

### downloadBollettino

**Rotta**: `/multe/download/:id`

**Metodo**: `GET`

**Scopo**: Scarica il bollettino di una multa specificata dall'ID.

**Body** (JSON): NO

**Output**:
```json

```

### checkMulte

**Rotta**: `/multe/:id`

**Metodo**: `GET`

**Scopo**: Controlla le multe associate a un veicolo specificato.

**Body** (JSON): NO

**Output**:
```json

```

### getTransito

**Rotta**: `/transito/:id`

**Metodo**: `GET`

**Scopo**: Recupera un transito specificato dall'ID.

**Body** (JSON): NO

**Output**:
```json

```

### createTransito

**Rotta**: `/transito`

**Metodo**: `POST`

**Scopo**: Crea un nuovo transito. Se il transito viola le regole della ZTL allora viene creata anche la multa.

**Body** (JSON):
```json
{
  "targa": "DEF456",
  "varcoId": 1,
  "dataOraTransito": "2024-12-25T10:15:00"
} 

```

**Output**:
```json

```

### deleteTransito

**Rotta**: `/transito/:id`

**Metodo**: `DELETE`

**Scopo**: Elimina un transito specificato dall'ID.

**Body** (JSON): NO

**Output**:
```json

```

### updateTransito

**Rotta**: `/transito/:id`

**Metodo**: `PUT`

**Scopo**: Aggiorna un transito esistente.

**Body** (JSON):
```json
{
  "targaVeicolo": "ABC123",
  "varcoId": 1
}

```

**Output**:
```json

```

### getTransitiByVarco

**Rotta**: `/transito/varco/:varcoId`

**Metodo**: `GET`

**Scopo**: Recupera tutti i transiti associati a un varco specificato.

**Body** (JSON): NO

**Output**:
```json

```

### getTransitoByVeicolo

**Rotta**: `/transito/veicolo/:targa`

**Metodo**: `GET`

**Scopo**: Recupera tutti i transiti associati a un veicolo specificato dalla targa.

**Body** (JSON): NO

**Output**:
```json

```

### getVarchi

**Rotta**: `/varco`

**Metodo**: `GET`

**Scopo**: Recupera tutti i varchi.

**Body** (JSON):

**Output**:
```json

```

### getVarcoById

**Rotta**: `/varco/:id`

**Metodo**: `GET`

**Scopo**: Recupera un varco specificato dall'ID. 

**Body** (JSON): NO

**Output**:
```json

```

### createVarco

**Rotta**: `/varco`

**Metodo**: `POST`

**Scopo**: Crea un nuovo varco.

**Body** (JSON):
```json
{
  "location": "Piazza del Duomo",
  "ztlId": 1
}

```

**Output**:
```json

```

### updateVarco

**Rotta**: `/varco/:id`

**Metodo**: `PUT`

**Scopo**: Aggiorna un varco esistente.

**Body** (JSON):
```json
{
  "location": "Piazza del Duomo Aggiornato",
  "ztlId": 1
}

```

**Output**:
```json

```

### deleteVarco

**Rotta**: `/varco/:id`

**Metodo**: `DELETE`

**Scopo**: Elimina un varco specificato dall'ID.

**Body** (JSON): NO

**Output**:
```json

```


## Back-end pagamenti

**Radice URL**: `http://127.0.0.1:4000`

**Autenticazione**: Bearer {loginToken}

### pagaMulta

**Rotta**: `/pagamento/:id`  

**Metodo**: `PUT`  

**Scopo**: Paga una multa specificata dall'ID.  

**Body** (JSON): NO

**Output**:
```json

```

### getCredito

**Rotta**: `/crediti`

**Metodo**: `GET`

**Scopo**: Recupera il credito attuale dell'utente.

**Body** (JSON): NO

**Output**:
```json

```

### ricaricaCredito

**Rotta**: `/crediti/ricarica`

**Metodo**: `PUT`

**Scopo**: Ricarica il credito dell'utente.

**Body** (JSON):
```json
{
  "userId": 2,
  "importoRicarica": "1000.50"
}

```

**Output**:
```json

```

### downloadRicevuta

**Rotta**: `/pagamento/ricevuta/:id`

**Metodo**: `GET`

**Scopo**:  Scarica la ricevuta di un pagamento specificato dall'ID.

**Body** (JSON): NO

**Output**:
```json

```





## Strumenti utilizzati
Per lo sviluppo dell'applicazione presentata sono stati utilizzati i seguenti strumenti di lavoro:

- [Visual Studio Code](https://code.visualstudio.com/): un editor di codice leggero e altamente estensibile, utilizzato per scrivere e gestire il codice dell'applicazione;
- [GitHub](https://github.com/): una piattaforma di versionamento e collaborazione, utilizzata per ospitare il codice sorgente del progetto e tenere traccia delle modifiche;
- [Typescript](https://www.typescriptlang.org/): un linguaggio di programmazione che estende JavaScript aggiungendo il supporto per i tipi statici, rendendo il codice più robusto e manutenibile;
- [Express.js](https://expressjs.com/): un framework minimalista per applicazioni web, utilizzato per semplificare la creazione di server e la gestione delle rotte HTTP in ambiente Node.js;
- [Node.js](https://nodejs.org/): una piattaforma che permette di eseguire JavaScript lato server, usata per costruire applicazioni scalabili e gestire moduli e pacchetti;
- [Sequelize](https://sequelize.org/): un ORM (Object Relational Mapping) che facilita l'interazione con database relazionali;
- [Docker](https://www.docker.com/): una piattaforma di containerizzazione che permette di impacchettare l'applicazione e le sue dipendenze in ambienti isolati e portabili, semplificando il deployment e la gestione dei servizi;
- [PostgreSQL](https://www.postgresql.org/): un sistema di database relazionale open-source, scelto per gestire e memorizzare in modo efficiente i dati dell'applicazione;
- [Postman](https://www.postman.com/): uno strumento per testare le API, utilizzato per simulare le chiamate HTTP e verificare il corretto funzionamento delle rotte e delle risposte del server.






## Autori 
| Nome e Cognome  | Email  |
|-------------|-------------|
| Marco Barbarella    | [s1119226@studenti.univpm.it](mailto:s1119226@studenti.univpm.it) |
| Alessandro Pieragostini    | [s1119377@studenti.univpm.it](mailto:s1119377@studenti.univpm.it)   |


