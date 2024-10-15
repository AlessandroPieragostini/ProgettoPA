<p align="center">
  <img src="./images/logo.png" alt="GESTIONE ZTL">
</p>

<h1 align="center">ZTL Management System</h1>

# Indice

- [Indice](#indice)
- [Obiettivo](#obiettivo)
- [Installazione](#installazione)
- [Scelte implementative](#scelte-implementative)
- [Progettazione](#progettazione)
  - [Architettura](#architettura)
  - [Struttura Progetto](#struttura-progetto)
  - [Diagrammi dei casi d'uso](#diagrammi-dei-casi-duso)
  - [Diagrammi delle sequenze](#diagrammi-delle-sequenze)
  - [Database schema](#database-schema)
- [Pattern Utilizzati](#pattern-utilizzati)
- [Rotte API](#rotte-api)
- [Strumenti Utilizzati](#strumenti-utilizzati)
- [Autori](#autori)



# Obiettivo
Questo progetto, sviluppato per il corso di Programmazione Avanzata dell'Anno Accademico 2023/2024, ha come obiettivo la realizzazione di un sistema back-end per la gestione delle Zone a Traffico Limitato (ZTL) di una città. Il sistema consente il monitoraggio dei transiti dei veicoli attraverso varchi ZTL, calcolando in modo automatico le multe per i veicoli che violano le restrizioni di accesso. Il progetto si articola in due back-end distinti:

Back-end di gestione transiti, che permette di monitorare i varchi ZTL, inserire i transiti dei veicoli, e calcolare automaticamente le multe in base alla tipologia del veicolo, alla fascia oraria e al giorno della settimana.
Back-end di gestione pagamenti, che consente agli utenti di verificare e pagare le multe ricevute attraverso un sistema di crediti.
L'intero sistema è stato sviluppato utilizzando Node.js e Express, con Sequelize come ORM per l'integrazione con un database PostgreSQL. Il progetto adotta pratiche di sviluppo moderne, tra cui l'uso di Typescript, il pattern Model-View-Controller (MVC), e la containerizzazione tramite Docker, garantendo modularità, scalabilità e facilità di manutenzione.

In aggiunta, il sistema supporta l'autenticazione mediante JWT (JSON Web Tokens) per garantire l'accesso sicuro e autorizzato alle diverse rotte API, e include funzionalità di validazione e gestione degli errori attraverso middleware dedicati. 

# Installazione
Istruzioni su come installare e configurare il progetto:
```bash
# Clona il repository
git clone https://github.com/AlessandroPieragostini/ProgettoPA.git

# Vai nella cartella del progetto
cd ProgettoPA

# Importa il file '.env' all'interno della directory principale 

# Avvia il progetto (assicurandoti di aver precendentemente installato Docker e docker-compose)
docker-compose up --build
```
Esempio di file __.env__

```bash
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_HOST=database
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name

ZTL_BACKEND_PORT=3000
PAGAMENTI_BACKEND_PORT=4000

JWT_SECRET=your_secret_key
```

# Scelte implementative

* L'inserimento dei transiti da parte del varco è stato predisposto in vista di uno sviluppo futuro, ma non si avranno rotte che permetteranno di farlo.

* Il transito di un veicolo in un varco è da considerare soltanto come ingresso.

* Sviluppo futuro: utilizzo di strumenti, ad esempio Axios, per l'interazione tra i due back-end evitando che si cambi porta per le chiamate API


# Progettazione

## Architettura

![architettura](./images/architettura.png)

1. **Back-end Transiti (Porta 3000)**:
   - Un container Docker che ospita il back-end dedicato alla gestione dei transiti in ZTL.
   - Riceve chiamate API da parte dell'utente.
   - Dipende dal container del database **PostgreSQL**.

2. **Back-end Pagamenti (Porta 4000)**:
   - Un altro container Docker che ospita il back-end per la gestione dei pagamenti delle multe.
   - Riceve anch'esso chiamate API dall'utente.
   - Dipende dal container del database **PostgreSQL**.

3. **PostgreSQL**:
   - Un container Docker che esegue il database **PostgreSQL**.
   - Utilizzato sia dal back-end Transiti che dal back-end Pagamenti per l'accesso ai dati.
   - Entrambi i servizi hanno una dipendenza da questo container.


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
├── test_postman
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
├──LICENSE
└──README.md
```

## Diagrammi dei casi d'uso

Nel sistema sviluppato, ci sono quattro tipologie di utenti principali: Utente, Operatore, Admin, e Varco. Ciascuna di queste entità interagisce con il sistema per svolgere determinate operazioni.

- **Utente**: Può autenticarsi, visualizzare eventuali multe a suo carico. Può anche scaricare il bollettino per il pagamento, effettuare i pagamenti delle multe e stampare le ricevute associate ad essi.

- **Operatore**: Ha il compito di monitorare e gestire le CRUD per i varchi, le ZTL e i transiti.

- **Admin**: Si occupa della ricarica del credito di un utente.

- **Varco**: È abilitato a registrare un transito.

![CASI_D_USO](./images/Casi_d_uso.png)

## Diagrammi delle sequenze

> Dato che la maggior parte dei diagrammi risultavano con la stessa struttura, mostreremo di seguito soltanto alcuni di essi, quelli di maggior interesse e particolarità.

* __POST /login__

Il diagramma di sequenza rappresenta il processo di autenticazione tramite login.

1. **Invio della richiesta di login**:
   - Un utente invia una richiesta HTTP POST all'endpoint `/login`, includendo l'email e altri dati necessari per l'autenticazione.

2. **Validazione della richiesta**:
   - Il middleware `validateLogin` verifica che i dati forniti nella richiesta siano validi. Se mancano informazioni o ci sono errori di validazione, viene restituito un messaggio d'errore e la richiesta viene interrotta.

3. **Ricerca dell'utente**:
   - Il controller `loginController` recupera l'email dal corpo della richiesta o dai parametri della query. Se l'email non viene fornita, viene generato un errore `BadRequest` tramite `ErrorFactory` e la richiesta viene interrotta.
   - Viene invocato il DAO `UserDAO` per cercare l'utente nel database. Se l'utente non viene trovato, viene restituito un errore di autorizzazione `Unauthorized`.

4. **Generazione del token**:
   - Se l'utente viene trovato nel database, viene generato un token JWT contenente l'ID, l'email e il ruolo dell'utente. Il token viene restituito all'utente nella risposta JSON.

5. **Gestione degli errori**:
   - Il middleware `errorHandler` gestisce eventuali errori generati durante il processo e restituisce una risposta con il codice di errore e un messaggio appropriato in formato JSON.

![login](./images/DS_login.png)

* __POST /transito__

Il diagramma di sequenza rappresenta il flusso di operazioni coinvolto nella creazione di un nuovo transito. 

1. **Richiesta POST per la creazione del transito**:
   - L'utente (ruolo `operatore` o `varco`) invia una richiesta HTTP POST all'endpoint `/transito` con il token di autenticazione e i dettagli del transito (targa, ID del varco, data e ora del transito).

2. **Autenticazione e Autorizzazione**:
   - Il middleware `authenticateToken` verifica la validità del token JWT fornito nell'header della richiesta. Se il token è mancante o invalido, viene restituito un errore.
   - Il middleware `authorizeRole` controlla il ruolo dell'utente per assicurarsi che abbia i permessi necessari per eseguire l'operazione. Se il ruolo non è autorizzato, viene restituito un errore di accesso negato.

3. **Validazione della richiesta**:
   - La richiesta viene validata per assicurarsi che i dati forniti rispettino i requisiti dell'API. In caso di dati non validi, viene restituito un errore di validazione.

4. **Verifica del veicolo**:
   - Il sistema controlla se il veicolo esiste nel database (`Veicolo`). Se non esiste, viene generato un errore e l'operazione viene interrotta.

5. **Creazione del transito**:
   - Se il veicolo è valido, viene creato un nuovo record di transito utilizzando il DAO `TransitoDAO`.
   - Il sistema verifica poi se il veicolo è presente nella whitelist (`Whitelist`). Se il veicolo è nella lista, nessuna multa viene emessa.

6. **Verifica della ZTL**:
   - Se il veicolo non è nella whitelist, il sistema controlla se la ZTL associata al varco è attiva al momento del transito. Se è attiva, viene creata una multa tramite la funzione `createMulta`.

7. **Risposta**:
   - Il sistema restituisce una risposta HTTP con lo stato del nuovo transito creato o eventuali errori.

8. **Gestione degli errori**:
   - Il middleware `errorHandler` gestisce eventuali errori, restituendo una risposta appropriata con un messaggio d'errore in formato JSON.


![createTransito](./images/DS_createTransito.png)

* __GET /multe/:id__

Il diagramma di sequenza rappresenta il processo per il controllo delle multe a carico di un utente. 

1. **Richiesta GET per il controllo delle multe**:
   - Un utente (con il ruolo `utente`) invia una richiesta HTTP GET all'endpoint `/multe/:id` con il token di autenticazione. L'ID passato nella richiesta rappresenta l'utente per il quale si vogliono controllare le multe.

2. **Autenticazione e Autorizzazione**:
   - Il middleware `authenticateToken` verifica la validità del token JWT presente nell'header della richiesta. Se il token è mancante o invalido, viene restituito un errore di autenticazione.
   - Il middleware `authorizeRole` controlla che l'utente abbia il ruolo corretto (`utente`) per poter eseguire questa operazione. In caso contrario, viene restituito un errore di accesso negato.

3. **Validazione della richiesta**:
   - L'ID dell'utente viene validato per assicurarsi che sia un intero valido. Se non lo è, viene restituito un errore di validazione.

4. **Recupero dei veicoli dell'utente**:
   - Il sistema, tramite il DAO `MultaDAO`, cerca tutti i veicoli associati all'ID dell'utente. Se non vengono trovati veicoli, viene restituito un errore che segnala che l'utente non ha veicoli associati.

5. **Recupero delle multe**:
   - Per ciascun veicolo trovato, il sistema cerca le multe associate alla targa del veicolo e raccoglie tutte le informazioni in un array.
   - Se vengono trovate multe, queste vengono restituite all'utente in formato JSON.

6. **Risposta**:
   - Il sistema restituisce una risposta HTTP con le multe associate ai veicoli dell'utente. Se nessuna multa viene trovata, viene restituito un errore che segnala l'assenza di multe.

7. **Gestione degli errori**:
   - Il middleware `errorHandler` intercetta e gestisce eventuali errori, restituendo una risposta appropriata con il codice di errore e un messaggio esplicativo in formato JSON.

![checkMulte](./images/DS_checkMulte.png)

* __PUT /multe/:uuidPagamento__

Il diagramma di sequenza rappresenta il processo di pagamento di una multa da parte di un utente autenticato.

1. **Richiesta PUT per il pagamento della multa**:
   - L'utente (con il ruolo `utente`) invia una richiesta HTTP PUT all'endpoint `/pagamento/:uuidPagamento` con il token di autenticazione. Il parametro `uuidPagamento` rappresenta la multa da pagare.

2. **Autenticazione e Autorizzazione**:
   - Il middleware `authenticateToken` verifica la validità del token JWT fornito nell'header della richiesta. Se il token è mancante o invalido, viene restituito un errore di autenticazione.
   - Il middleware `authorizeRole` verifica che l'utente abbia il ruolo corretto (`utente`) per eseguire questa operazione. In caso contrario, viene restituito un errore di accesso negato.

3. **Validazione della richiesta**:
   - Il parametro `uuidPagamento` viene validato per assicurarsi che sia un UUID valido. In caso di errore, viene restituito un errore di validazione.

4. **Recupero dell'utente**:
   - Il sistema utilizza il DAO `UserDAO` per recuperare i dettagli dell'utente in base all'ID associato al token JWT. Se l'utente non viene trovato, viene restituito un errore che segnala che l'utente non esiste.

5. **Recupero della multa**:
   - Il sistema utilizza il DAO `MultaDAO` per cercare la multa corrispondente all'`uuidPagamento`. Se la multa non esiste o è già stata pagata, viene restituito un errore.

6. **Verifica del credito disponibile**:
   - Il sistema verifica che l'utente abbia sufficiente credito per pagare la multa. Se il credito non è sufficiente, viene restituito un errore.

7. **Aggiornamento della multa e del credito**:
   - Se tutte le condizioni sono soddisfatte, il sistema aggiorna lo stato della multa a "pagata" tramite `MultaDAO.pagaMulta`.
   - Il sistema detrae l'importo della multa dal credito dell'utente e aggiorna il nuovo saldo tramite `UserDAO.aggiornaCredito`.

8. **Risposta**:
   - Se il pagamento è andato a buon fine, il sistema restituisce una risposta JSON con i dettagli del pagamento e un messaggio di conferma.

9. **Gestione degli errori**:
   - Il middleware `errorHandler` intercetta e gestisce eventuali errori durante il processo, restituendo una risposta con il codice di errore e un messaggio esplicativo in formato JSON.

![pagaMulte](./images/DS_pagaMulta.png)

* __GET /ricevuta/:uuidPagamento__

Il diagramma di sequenza rappresenta il processo di pagamento di una multa e la generazione della ricevuta.

1. **Richiesta GET della ricevuta del pagamento**:
   - Un utente (con il ruolo `utente`) invia una richiesta HTTP GET all'endpoint `/ricevuta/:uuidPagamento` per stampare la ricevuta di pagamento della multa, fornendo il `uuidPagamento` della multa come parametro.

2. **Autenticazione e Autorizzazione**:
   - Il middleware `authenticateToken` verifica la validità del token JWT presente nell'header della richiesta. Se il token è mancante o invalido, viene restituito un errore di autenticazione.
   - Il middleware `authorizeRole` controlla che l'utente abbia il ruolo corretto (`utente`) per poter eseguire questa operazione. In caso contrario, viene restituito un errore di accesso negato.

3. **Validazione della richiesta**:
   - Il middleware `validateStampaRicevuta` verifica che il parametro `uuidPagamento` sia un UUID valido. Se non lo è, viene restituito un errore di validazione.

4. **Recupero della multa**:
   - Il sistema, tramite il DAO `MultaDAO`, cerca la multa associata all'UUID di pagamento fornito. Se la multa non esiste o non è stata pagata, viene restituito un errore appropriato.

5. **Generazione della ricevuta in PDF**:
   - Se la multa è valida e pagata, il sistema genera un documento PDF utilizzando la libreria `PDFKit`, includendo dettagli come targa del veicolo, importo, UUID del pagamento e ID della multa.

6. **Risposta**:
   - Se tutto va a buon fine, il sistema restituisce la ricevuta in formato PDF. Se ci sono errori durante il processo, questi vengono gestiti e restituiti in formato JSON.

7. **Gestione degli errori**:
   - Il middleware `errorHandler` intercetta e gestisce eventuali errori, restituendo una risposta appropriata con il codice di errore e un messaggio esplicativo in formato JSON.

![pagaMulte](./images/DS_stampaRicevuta.png)

* __GET /transito/getTransitiByVarco__

Il diagramma di sequenza rappresenta il processo per ottenere tutti i transiti associati a un varco specifico.

1. **Richiesta GET per i transiti del varco**:
   - Un operatore (con il ruolo `operatore`) invia una richiesta HTTP GET all'endpoint `/varco/:varcoId` con il token di autenticazione. Il parametro `varcoId` rappresenta l'ID del varco per il quale si vogliono ottenere i transiti registrati.

2. **Autenticazione e Autorizzazione**:
   - Il middleware `authenticateToken` verifica la validità del token JWT presente nell'header della richiesta. Se il token è mancante o invalido, viene restituito un errore di autenticazione.
   - Il middleware `authorizeRole` controlla che l'utente abbia il ruolo corretto (`operatore`) per poter eseguire questa operazione. In caso contrario, viene restituito un errore di accesso negato.

3. **Validazione della richiesta**:
   - Il middleware `validateGetTransitoByVarco` valida il parametro `varcoId` per assicurarsi che sia un intero positivo. Se non lo è, viene restituito un errore di validazione.

4. **Recupero dei transiti dal DAO**:
   - Il controller chiama il metodo `findAllByVarco` del DAO `TransitoDAO`, il quale recupera tutti i transiti registrati associati al varco con ID `varcoId` dal database. Se non vengono trovati transiti, viene restituito un errore che segnala l'assenza di transiti per quel varco.

5. **Risposta**:
   - Se i transiti vengono trovati, il sistema restituisce una risposta HTTP con codice `200` e i dati dei transiti in formato JSON. In caso contrario, viene restituito un errore di "transito non trovato".

6. **Gestione degli errori**:
   - Il middleware `errorHandler` intercetta e gestisce eventuali errori, restituendo una risposta appropriata con il codice di errore e un messaggio esplicativo in formato JSON.

![getTransitiByVarco](./images/DS_transitoByVarco.png)

## Database Schema

Il sistema utilizza **PostgreSQL** come RDBMS, il quale è particolarmente indicato per applicazioni back-end come quella sviluppata in questo progetto, dove l'autenticazione sicura dei dati e l'efficienza nelle operazioni di lettura e scrittura sono fondamentali. Grazie alle sue prestazioni ottimizzate, PostgreSQL rappresenta una soluzione ideale per garantire la robustezza e la velocità del sistema.

![DATABASE](./images/database_schema.png)

# Pattern Utilizzati
Durante lo sviluppo del progetto, abbiamo adottato diversi design patterns per garantire un'architettura solida, scalabile e manutenibile. Di seguito vengono descritti i principali pattern utilizzati e le motivazioni dietro la loro scelta.

### 1. MVC
L'MVC (Model-View-Controller) è un pattern architetturale utilizzato per organizzare le applicazioni software separando le diverse responsabilità in tre componenti principali. 
Il Model gestisce i dati, la logica di business e le operazioni legate ai dati come i database. La View è responsabile della rappresentazione dei dati che viene testata tramite Postman che restituisce dati in formato JSON. Il Controller, invece, funge da intermediario tra la View e il Model: riceve gli input dell'utente dalla View, elabora le richieste, interagisce con il Model e restituisce i dati.

L'utilizzo del pattern MVC offre numerosi vantaggi. La sua struttura a componenti ben definiti consente una chiara separazione delle responsabilità, facilitando la comprensione e la gestione del codice, soprattutto in progetti di grandi dimensioni. Questa separazione rende anche più facile la manutenzione e l'aggiornamento dell'applicazione, poiché ogni parte può essere modificata senza influenzare le altre. Ad esempio, è possibile cambiare l'interfaccia grafica (View) senza dover toccare la logica del business (Model), o viceversa. Inoltre, MVC favorisce la modularità e la riutilizzabilità del codice: le stesse View possono essere utilizzate con diversi Model e i Controller possono gestire più View. Infine, questa architettura migliora la testabilità del software, permettendo di testare separatamente le varie componenti.

### 2. DAO
Il DAO (Data Access Object) è un pattern architetturale che si occupa della gestione dell'accesso ai dati in modo strutturato e indipendente dalla tecnologia sottostante. L'obiettivo del DAO è fornire un'interfaccia standardizzata per interagire con i dati, isolando la logica applicativa dai dettagli specifici relativi alla persistenza e gestione dei database, come query SQL. Attraverso il DAO, le operazioni CRUD vengono incapsulate in metodi dedicati, consentendo agli sviluppatori di interagire con i dati attraverso oggetti di alto livello, senza preoccuparsi della connessione diretta al database o dei dettagli tecnici di gestione delle transazioni.

Il principale vantaggio del pattern DAO è la separazione delle responsabilità. Isolando l'accesso ai dati dalla logica applicativa, il codice risulta più modulare e facile da mantenere. Questa separazione permette, ad esempio, di cambiare il tipo di database o la modalità di accesso ai dati senza impattare altre parti del sistema. Il DAO favorisce anche una maggiore manutenibilità e scalabilità: eventuali modifiche al modo in cui i dati possono essere fatte in un unico punto centralizzato.

### 3.CoR
Il Chain of Responsibility (CoR) è un pattern comportamentale che permette di gestire richieste in modo flessibile e dinamico attraverso una catena di handler (gestori), ognuno dei quali può elaborare la richiesta o passarla al successivo nella sequenza. Questo pattern evita l'accoppiamento diretto tra il mittente di una richiesta e i suoi destinatari, decentralizzando così il processo decisionale. Ogni handler nella catena è responsabile di valutare la richiesta: può scegliere di gestirla, elaborando la logica associata, oppure passare la richiesta a un altro handler, creando una catena di responsabilità che continua finché uno degli handler non la prende in carico o finché non si esauriscono le opzioni.
Uno dei principali vantaggi del pattern CoR è la sua capacità di migliorare la flessibilità del sistema. Poiché i gestori sono organizzati in modo indipendente, è possibile modificare, aggiungere o rimuovere handler dalla catena senza alterare il codice del mittente o degli altri handler. Questo approccio rende il sistema facilmente estensibile e riduce la dipendenza tra componenti, facilitando la manutenzione del codice.
All’interno del progetto il pattern CoR è stato utilizzato all’interno dei middleware per implementare la validazione, l’autenticazione e la gestione degli errori.

### 4. Factory
Il Factory Pattern è un pattern creazionale che fornisce un modo per creare oggetti senza specificare esplicitamente la classe esatta da istanziare. L'idea di base è di delegare il compito di creare oggetti a una factory che si occupa di decidere quale tipo di oggetto restituire in base a determinate condizioni o parametri. Questo approccio permette di gestire in modo più flessibile la creazione degli oggetti, disaccoppiando il codice che richiede un'istanza da quello che effettivamente la crea.
Nel progetto è stata sviluppata l’errorFactory per la creazione e la gestione degli errori.

### 5. Singleton
Il Singleton Pattern è un pattern creazionale che garantisce che una classe abbia una sola istanza in tutto il programma e fornisce un punto di accesso globale a tale istanza. Questo pattern è utilizzato in situazioni in cui è necessario assicurarsi che esista un'unica rappresentazione di una risorsa, come una connessione a un database, e che tale risorsa sia condivisa da più parti dell'applicazione.
All’interno del progetto è stato necessario implementare un pattern singleton visto che il sistema è composto da due backend separati ma che utilizzano lo stesso database.


# Rotte API

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
| *PUT*     | `/crediti/ricarica/       `| SI              | Admin                 |

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
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6Im9wZXJhdG9yZSIsImlhdCI6MTcyODg0MjIxMiwiZXhwIjoxNzI4ODQ1ODEyfQ.WGEaGw1aQpHkAnePF8IpxGcMc-M9FDIEYI21g5qcOFc"
}
```

> Il token è mostrato in output soltanto a fini didattici. La rotta immette il token nella variabile {loginToken} dell'environment così da tenerlo memorizzato per eseguire successivamente le rotte.

### login_admin

**Rotta**: `/login?email=alice@example.com`

**Metodo**: `POST`

**Scopo**: Effettua il login come admin.

**Body** (JSON): NO

**Output**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODg0MjQxMSwiZXhwIjoxNzI4ODQ2MDExfQ.0R6XvS2den44zPEqCdjZnu1Ab59CxGJnieY5UEMQuGQ"
}
```

> Il token è mostrato in output soltanto a fini didattici. La rotta immette il token nella variabile {loginToken} dell'environment così da tenerlo memorizzato per eseguire successivamente le rotte.

### login_utente

**Rotta**: `/login?email=jane@example.com`

**Metodo**: `POST`

**Scopo**: Effettua il login come utente.

**Body** (JSON): NO

**Output**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lQGV4YW1wbGUuY29tIiwicm9sZSI6InV0ZW50ZSIsImlhdCI6MTcyODg0MjQyMywiZXhwIjoxNzI4ODQ2MDIzfQ.LQ9GSDM4AKe-6sFzS2oNPffXdEdnfwzxYQwUYheJM2I"
}
```

> Il token è mostrato in output soltanto a fini didattici. La rotta immette il token nella variabile {loginToken} dell'environment così da tenerlo memorizzato per eseguire successivamente le rotte.

## Back-end ZTL

**Radice URL**: `http://127.0.0.1:3000`

**Autenticazione**: Bearer {loginToken}

### getZTLById

**Rotta**: `/ztl/:id` (e.g. id=1)

**Metodo**: `GET`

**Scopo**: Recupera una Zona Traffico Limitato (ZTL) specificata dall'ID.

**Body** (JSON): NO

**Output**:
```json
{
    "id": 1,
    "nome": "Centro Storico",
    "descrizione": "Zona a traffico limitato nel centro città",
    "orarioInizio": "08:00",
    "orarioFine": "20:00",
    "giorniAttivi": [
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì"
    ],
    "created_at": "2024-10-13T17:56:06.071Z",
    "updated_at": "2024-10-13T17:56:06.071Z"
}
```

### getZTLs

**Rotta**: `/ztl`

**Metodo**: `GET`

**Scopo**: Recupera tutte le ZTL.

**Body** (JSON): NO

**Output**:
```json
[
    {
        "id": 1,
        "nome": "Centro Storico",
        "descrizione": "Zona a traffico limitato nel centro città",
        "orarioInizio": "08:00",
        "orarioFine": "20:00",
        "giorniAttivi": [
            "Lunedì",
            "Martedì",
            "Mercoledì",
            "Giovedì",
            "Venerdì"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    },
    {
        "id": 2,
        "nome": "Zona Universitaria",
        "descrizione": "Zona a traffico limitato per il campus universitario",
        "orarioInizio": "07:00",
        "orarioFine": "19:00",
        "giorniAttivi": [
            "Lunedì",
            "Martedì",
            "Mercoledì",
            "Giovedì",
            "Venerdì"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    },
    {
        "id": 3,
        "nome": "Mercato",
        "descrizione": "Zona a traffico limitato durante il mercato settimanale",
        "orarioInizio": "06:00",
        "orarioFine": "14:00",
        "giorniAttivi": [
            "Sabato",
            "Domenica"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    },
    {
        "id": 4,
        "nome": "Zona Turistica",
        "descrizione": "Zona a traffico limitato nelle aree turistiche",
        "orarioInizio": "09:00",
        "orarioFine": "22:00",
        "giorniAttivi": [
            "Lunedì",
            "Martedì",
            "Mercoledì",
            "Giovedì",
            "Venerdì",
            "Sabato",
            "Domenica"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    },
    {
        "id": 5,
        "nome": "Viale dei Giardini",
        "descrizione": "Zona a traffico limitato nel parco cittadino",
        "orarioInizio": "10:00",
        "orarioFine": "18:00",
        "giorniAttivi": [
            "Lunedì",
            "Martedì",
            "Mercoledì",
            "Giovedì",
            "Venerdì"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    },
    {
        "id": 6,
        "nome": "Stazione Centrale",
        "descrizione": "Zona a traffico limitato intorno alla stazione",
        "orarioInizio": "05:00",
        "orarioFine": "23:00",
        "giorniAttivi": [
            "Lunedì",
            "Martedì",
            "Mercoledì",
            "Giovedì",
            "Venerdì",
            "Sabato",
            "Domenica"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    },
    {
        "id": 7,
        "nome": "Centro Commerciale",
        "descrizione": "Zona a traffico limitato intorno al centro commerciale",
        "orarioInizio": "10:00",
        "orarioFine": "21:00",
        "giorniAttivi": [
            "Sabato",
            "Domenica"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    },
    {
        "id": 8,
        "nome": "Zona Artigianale",
        "descrizione": "Zona a traffico limitato nelle aree artigianali",
        "orarioInizio": "08:00",
        "orarioFine": "17:00",
        "giorniAttivi": [
            "Martedì",
            "Giovedì",
            "Venerdì"
        ],
        "created_at": "2024-10-13T17:56:06.071Z",
        "updated_at": "2024-10-13T17:56:06.071Z"
    }
]
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
    "id": 9,
    "nome": "Zona Traffico Limitato Centro",
    "descrizione": "Area ZTL nel centro della città, valida per traffico limitato nei giorni lavorativi.",
    "orarioInizio": "08:00",
    "orarioFine": "18:00",
    "giorniAttivi": [
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì"
    ],
    "updated_at": "2024-10-13T18:01:51.013Z",
    "created_at": "2024-10-13T18:01:51.013Z"
}
```

### updateZTL

**Rotta**: `/ztl/:id` (e.g. id=5)

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
    "id": 5,
    "nome": "Zona Traffico Limitato Centro",
    "descrizione": "Area ZTL nel centro della città, valida per traffico limitato nei giorni lavorativi.",
    "orarioInizio": "08:00",
    "orarioFine": "18:00",
    "giorniAttivi": [
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì"
    ],
    "created_at": "2024-10-13T17:56:06.071Z",
    "updated_at": "2024-10-13T18:02:12.390Z"
}
```

### deleteZTL

**Rotta**: `/ztl/:id` (e.g. id=5)

**Metodo**: `DELETE`

**Scopo**: Elimina una Zona Traffico Limitato (ZTL) specificata dall'ID.

**Body** (JSON): NO

**Output**:
```json
{
    "data": {
        "message": "ZTL eliminata con successo",
        "ztl": {
            "id": 5,
            "nome": "Zona Traffico Limitato Centro",
            "descrizione": "Area ZTL nel centro della città, valida per traffico limitato nei giorni lavorativi.",
            "orarioInizio": "08:00",
            "orarioFine": "18:00",
            "giorniAttivi": [
                "Lunedì",
                "Martedì",
                "Mercoledì",
                "Giovedì",
                "Venerdì"
            ],
            "created_at": "2024-10-13T17:56:06.071Z",
            "updated_at": "2024-10-13T18:02:12.390Z"
        }
    }
}
```

### downloadBollettino

**Rotta**: `/multe/download/:id` (e.g. id=1)

**Metodo**: `GET`

**Scopo**: Scarica il bollettino di una multa specificata dall'ID.

**Body** (JSON): NO

**Output**:

![](./images/bollettino.png)


### checkMulte

**Rotta**: `/multe/:id` (e.g. id=2)

**Metodo**: `GET`

**Scopo**: Controlla le multe associate a un veicolo specificato.

**Body** (JSON): NO

**Output**:
```json
[
    {
        "id": 1,
        "importo": "100.00",
        "pagato": false,
        "targaVeicolo": "ABC123",
        "transitoId": 1,
        "dataMulta": "2024-01-16T12:00:00.000Z",
        "uuidPagamento": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "created_at": "2024-10-13T17:56:06.084Z",
        "updated_at": "2024-10-13T17:56:06.084Z"
    },
    {
        "id": 3,
        "importo": "200.00",
        "pagato": false,
        "targaVeicolo": "DEF456",
        "transitoId": 3,
        "dataMulta": "2024-01-18T16:45:00.000Z",
        "uuidPagamento": "fa17cb9a-eeb1-40e7-bfab-13f587d1b6cc",
        "created_at": "2024-10-13T17:56:06.084Z",
        "updated_at": "2024-10-13T17:56:06.084Z"
    }
]
```

### getTransito

**Rotta**: `/transito/:id` (e.g. id=1)

**Metodo**: `GET`

**Scopo**: Recupera un transito specificato dall'ID.

**Body** (JSON): NO

**Output**:
```json
{
    "id": 1,
    "targaVeicolo": "ABC123",
    "varcoId": 1,
    "dataOraTransito": "2024-01-15T08:30:00.000Z",
    "created_at": "2024-10-13T17:56:06.080Z",
    "updated_at": "2024-10-13T17:56:06.080Z"
}
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
{
    "id": 5,
    "targaVeicolo": "DEF456",
    "varcoId": 1,
    "dataOraTransito": "2024-12-25T10:15:00.000Z",
    "updated_at": "2024-10-13T18:11:28.944Z",
    "created_at": "2024-10-13T18:11:28.944Z"
}
```

### deleteTransito

**Rotta**: `/transito/:id` (e.g. id=3)

**Metodo**: `DELETE`

**Scopo**: Elimina un transito specificato dall'ID.

**Body** (JSON): NO

**Output**:
```json
{
    "data": {
        "message": "Transito eliminato con successo",
        "transito": {
            "id": 3,
            "targaVeicolo": "DEF456",
            "varcoId": 1,
            "dataOraTransito": "2024-01-17T14:00:00.000Z",
            "created_at": "2024-10-13T17:56:06.080Z",
            "updated_at": "2024-10-13T17:56:06.080Z"
        }
    }
}
```

### updateTransito

**Rotta**: `/transito/:id` (e.g. id=1)

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
{
    "id": 1,
    "targaVeicolo": "ABC123",
    "varcoId": 1,
    "dataOraTransito": "2024-01-15T08:30:00.000Z",
    "created_at": "2024-10-13T17:56:06.080Z",
    "updated_at": "2024-10-13T17:56:06.080Z"
}
```

### getTransitiByVarco

**Rotta**: `/transito/varco/:varcoId` (e.g. varcoId=1)

**Metodo**: `GET`

**Scopo**: Recupera tutti i transiti associati a un varco specificato.

**Body** (JSON): NO

**Output**:
```json
[
    {
        "id": 1,
        "targaVeicolo": "ABC123",
        "varcoId": 1,
        "dataOraTransito": "2024-01-15T08:30:00.000Z",
        "created_at": "2024-10-13T17:56:06.080Z",
        "updated_at": "2024-10-13T17:56:06.080Z"
    },
    {
        "id": 5,
        "targaVeicolo": "DEF456",
        "varcoId": 1,
        "dataOraTransito": "2024-12-25T10:15:00.000Z",
        "created_at": "2024-10-13T18:11:28.944Z",
        "updated_at": "2024-10-13T18:11:28.944Z"
    }
]
```

### getTransitoByVeicolo

**Rotta**: `/transito/veicolo/:targa` (e.g. targa=ABC123)

**Metodo**: `GET`

**Scopo**: Recupera tutti i transiti associati a un veicolo specificato dalla targa.

**Body** (JSON): NO

**Output**:
```json
[
    {
        "id": 1,
        "targaVeicolo": "ABC123",
        "varcoId": 1,
        "dataOraTransito": "2024-01-15T08:30:00.000Z",
        "created_at": "2024-10-13T17:56:06.080Z",
        "updated_at": "2024-10-13T17:56:06.080Z"
    }
]
```

### getVarchi

**Rotta**: `/varco`

**Metodo**: `GET`

**Scopo**: Recupera tutti i varchi.

**Body** (JSON):

**Output**:
```json
[
    {
        "id": 1,
        "location": "Via Roma",
        "ztlId": 1,
        "created_at": "2024-10-13T17:56:06.074Z",
        "updated_at": "2024-10-13T17:56:06.074Z"
    },
    {
        "id": 2,
        "location": "Piazza della Libertà",
        "ztlId": 1,
        "created_at": "2024-10-13T17:56:06.074Z",
        "updated_at": "2024-10-13T17:56:06.074Z"
    },
    {
        "id": 3,
        "location": "Viale Università",
        "ztlId": 2,
        "created_at": "2024-10-13T17:56:06.074Z",
        "updated_at": "2024-10-13T17:56:06.074Z"
    }
]
```

### getVarcoById

**Rotta**: `/varco/:id`

**Metodo**: `GET`

**Scopo**: Recupera un varco specificato dall'ID. 

**Body** (JSON): NO

**Output**:
```json
{
    "id": 1,
    "location": "Via Roma",
    "ztlId": 1,
    "created_at": "2024-10-13T17:56:06.074Z",
    "updated_at": "2024-10-13T17:56:06.074Z"
}
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
{
    "id": 4,
    "location": "Piazza del Duomo",
    "ztlId": 1,
    "updated_at": "2024-10-13T18:15:17.947Z",
    "created_at": "2024-10-13T18:15:17.947Z"
}
```

### updateVarco

**Rotta**: `/varco/:id` (e.g. id=1)

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
{
    "id": 1,
    "location": "Piazza del Duomo",
    "ztlId": 2,
    "created_at": "2024-10-13T17:56:06.074Z",
    "updated_at": "2024-10-13T18:15:33.397Z"
}
```

### deleteVarco

**Rotta**: `/varco/:id` (e.g. id=1)

**Metodo**: `DELETE`

**Scopo**: Elimina un varco specificato dall'ID.

**Body** (JSON): NO

**Output**:
```json
{
    "data": {
        "message": "Varco eliminato con successo",
        "varco": {
            "id": 1,
            "location": "Piazza del Duomo",
            "ztlId": 2,
            "created_at": "2024-10-13T17:56:06.074Z",
            "updated_at": "2024-10-13T18:15:33.397Z"
        }
    }
}
```


## Back-end pagamenti

**Radice URL**: `http://127.0.0.1:4000`

**Autenticazione**: Bearer {loginToken}


### pagaMulta

**Rotta**: `/pagamento/:id`  (e.g. id=f47ac10b-58cc-4372-a567-0e02b2c3d479)

**Metodo**: `PUT`  

**Scopo**: Paga una multa specificata dall'ID.  

**Body** (JSON): NO

**Output**:
```json
{
    "messaggio": "Pagamento avvenuto con successo",
    "pagamento": {
        "id": 1,
        "importo": "100.00",
        "pagato": true,
        "created_at": "2024-10-13T18:22:30.380Z",
        "updated_at": "2024-10-13T18:24:42.054Z",
        "targaVeicolo": "ABC123",
        "transitoId": 1,
        "dataMulta": "2024-01-16T12:00:00.000Z",
        "uuidPagamento": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
    }
}
```

### getCredito

**Rotta**: `/crediti`

**Metodo**: `GET`

**Scopo**: Recupera il credito attuale dell'utente.

**Body** (JSON): NO

**Output**:
```json
{
    "credito": "700.5"
}
```

### ricaricaCredito

**Rotta**: `/crediti/ricarica`

**Metodo**: `PUT`

**Scopo**: Ricarica il credito dell'utente.

**Body** (JSON):
```json
{
  "userId": 2,
  "importoRicarica": "300.50"
}

```

**Output**:
```json
{
    "messaggio": "Ricarica effettuata con successo",
    "creditoAggiornato": 1000.5
}
```

### downloadRicevuta

**Rotta**: `/pagamento/ricevuta/:id` (e.g. id=9e107d9d-372b-4984-b9d2-67d9a5f57487)

**Metodo**: `GET`

**Scopo**:  Scarica la ricevuta di un pagamento specificato dall'ID.

**Body** (JSON): NO

**Output**:

![](./images/ricevuta.png) 

# Strumenti utilizzati
Per lo sviluppo dell'applicazione presentata sono stati utilizzati i seguenti strumenti di lavoro:

- [GitHub](https://github.com/): una piattaforma di versionamento e collaborazione, utilizzata per ospitare il codice sorgente del progetto e tenere traccia delle modifiche;
- [Express.js](https://expressjs.com/): un framework minimalista per applicazioni web, utilizzato per semplificare la creazione di server e la gestione delle rotte HTTP in ambiente Node.js;
- [Node.js](https://nodejs.org/): una piattaforma che permette di eseguire JavaScript lato server, usata per costruire applicazioni scalabili e gestire moduli e pacchetti;
- [Sequelize](https://sequelize.org/): un ORM (Object Relational Mapping) che facilita l'interazione con database relazionali;
- [Jwt](https://jwt.io/): un formato standard aperto per la trasmissione sicura di informazioni tra le parti, rappresentato come un oggetto JSON; utilizzato principalmente per l'autenticazione e l'autorizzazione nelle applicazioni web;
- [Docker](https://www.docker.com/): una piattaforma di containerizzazione che permette di impacchettare l'applicazione e le sue dipendenze in ambienti isolati e portabili, semplificando il deployment e la gestione dei servizi;
- [PostgreSQL](https://www.postgresql.org/): un sistema di database relazionale open-source, scelto per gestire e memorizzare in modo efficiente i dati dell'applicazione;
- [Postman](https://www.postman.com/): uno strumento per testare le API, utilizzato per simulare le chiamate HTTP e verificare il corretto funzionamento delle rotte e delle risposte del server.




# Autori 
| Nome e Cognome  | Email  |
|-------------|-------------|
| Marco Barbarella    | [s1119226@studenti.univpm.it](mailto:s1119226@studenti.univpm.it) |
| Alessandro Pieragostini    | [s1119377@studenti.univpm.it](mailto:s1119377@studenti.univpm.it)   |

# License
This project is licensed under the [MIT License](LICENSE) - consulta il file [LICENSE](LICENSE) per ulteriori dettagli.