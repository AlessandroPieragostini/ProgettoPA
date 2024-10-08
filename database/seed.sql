-- Creazione della tabella ZTL (Zone a Traffico Limitato)
CREATE TABLE IF NOT EXISTS ztl (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    openingTime VARCHAR(10) NOT NULL,
    closingTime VARCHAR(10) NOT NULL,
    day VARCHAR(10) NOT NULL,
    CONSTRAINT chk_giornoSettimana CHECK (day IN ('Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'))
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Varco (Varchi associati a ZTL)
CREATE TABLE IF NOT EXISTS varco (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    ztlId INT REFERENCES ztl(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Veicolo (Veicoli che transitano attraverso i varchi)
CREATE TABLE IF NOT EXISTS veicoli (
    id SERIAL PRIMARY KEY,
    targa VARCHAR(50) UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Transito (Transiti registrati per ciascun veicolo attraverso i varchi)
CREATE TABLE IF NOT EXISTS transiti (
    id SERIAL PRIMARY KEY,
    veicoloId INT REFERENCES veicoli(id) ON DELETE CASCADE,
    varcoId INT REFERENCES varco(id) ON DELETE CASCADE,
    timestamp TIMESTAMP NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Multa (Multe associate ai transiti non autorizzati)
CREATE TABLE IF NOT EXISTS multe (
    id SERIAL PRIMARY KEY,
    importo DECIMAL(10, 2) NOT NULL,
    pagamentoEffettuato BOOLEAN DEFAULT FALSE,
    veicoloId INT REFERENCES veicolo(id) ON DELETE CASCADE,
    transitoId INT REFERENCES transiti(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Whitelist (Lista bianca per veicoli autorizzati a transitare)
CREATE TABLE IF NOT EXISTS whitelist (
    id SERIAL PRIMARY KEY,
    veicoloId INT REFERENCES veicoli(id) ON DELETE CASCADE,
    varcoId INT REFERENCES varco(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Tariffa (Tariffe per le multe basate sul tipo di infrazione o ZTL)
CREATE TABLE IF NOT EXISTS tariffa (
    id SERIAL PRIMARY KEY,
    importo DECIMAL(10, 2) NOT NULL,
    descrizione TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Users (Utenti del sistema con ruoli amministrativi o automobilisti)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,  -- Ad esempio, 'admin' o 'user'
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Popolamento iniziale delle tabelle con dati di esempio

-- Popolamento della tabella Tariffa
INSERT INTO tariffa (importo, descrizione) VALUES
(50.00, 'Tariffa base per il centro storico'),
(75.00, 'Tariffa per ZTL industriale');

-- Popolamento della tabella ZTL
INSERT INTO ztl (name, description, openingTime, closingTime) VALUES
('Centro Storico', 'Zona centrale a traffico limitato', '08:00', '18:00'),
('Zona Industriale', 'Area a traffico limitato per camion', '06:00', '20:00');

-- Popolamento della tabella Varco
INSERT INTO varco (location, ztlId) VALUES
('Via Roma', 1),
('Via Verdi', 1),
('Corso Italia', 2);

-- Popolamento della tabella Veicolo
INSERT INTO veicoli (targa, tipo) VALUES
('AB123CD', 'Auto'),
('XY987ZT', 'Camion');

-- Popolamento della tabella Transito
INSERT INTO transiti (veicoloId, varcoId, timestamp) VALUES
(1, 1, '2024-10-03 08:30:00'),
(2, 2, '2024-10-03 09:00:00');

-- Popolamento della tabella Multa
INSERT INTO multe (importo, pagamentoEffettuato, veicoloId, transitoId) VALUES
(100.00, FALSE, 1, 1),
(200.00, TRUE, 2, 2);

-- Popolamento della tabella Whitelist
INSERT INTO whitelist (veicoloId, varcoId) VALUES
(1, 1),
(2, 2);

-- Popolamento della tabella Users
INSERT INTO users (username, password, role) VALUES
('admin', 'password123', 'admin'),
('user1', 'password123', 'user');