CREATE DATABASE IF NOT EXISTS ztl_db;



-- Creazione della tabella ZTL (Zone a Traffico Limitato)
CREATE TABLE IF NOT EXISTS ztl (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    openingTime VARCHAR(10) NOT NULL,
    closingTime VARCHAR(10) NOT NULL,
    day VARCHAR(10) NOT NULL,
    CONSTRAINT chk_day CHECK (day IN ('Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato')),
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
    targa VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Transito (Transiti registrati per ciascun veicolo attraverso i varchi)
CREATE TABLE IF NOT EXISTS transiti (
    id SERIAL PRIMARY KEY,
    targaVeicolo INT REFERENCES veicoli(targa) ON DELETE CASCADE,
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
    targaVeicolo INT REFERENCES veicolo(targa) ON DELETE CASCADE,
    transitoId INT REFERENCES transiti(id) ON DELETE CASCADE,
    dataMulta TIMESTAMP,
    uuidPagamento INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whitelist (
    targaVeicolo VARCHAR(255) PRIMARY KEY,
    dataScadenza TIMESTAMP NULL,
    FOREIGN KEY (targaVeicolo) REFERENCES veicolo(targa)
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE IF NOT EXISTS tariffa (
    idTariffa SERIAL PRIMARY KEY,
    tipoVeicolo VARCHAR(50) NOT NULL CHECK (tipoVeicolo IN ('elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone')),
    fasciaOraria VARCHAR(20) NOT NULL CHECK (fasciaOraria IN ('giorno', 'notte', 'ore_punta')),
    giornoFestivo BOOLEAN NOT NULL,
    costo DECIMAL(10, 2) NOT NULL
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    token DECIMAL NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('USER', 'ADMIN', 'SUPER_ADMIN')), -- Modifica a seconda dei ruoli definiti in UserRole
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -- Popolamento iniziale delle tabelle con dati di esempio
-- Popolamento della tabella ztl
INSERT INTO ztl (name, description, openingTime, closingTime, day) VALUES
('Centro Storico', 'Zona a traffico limitato nel centro città', '08:00', '20:00', 'Lunedì'),
('Zona Universitaria', 'Zona a traffico limitato per il campus universitario', '07:00', '19:00', 'Martedì'),
('Mercato', 'Zona a traffico limitato durante il mercato settimanale', '06:00', '14:00', 'Sabato');

-- Popolamento della tabella varco
INSERT INTO varco (location, ztlId) VALUES
('Via Roma', 1),
('Piazza della Libertà', 1),
('Viale Università', 2);

-- Popolamento della tabella veicoli
INSERT INTO veicoli (targa, tipo) VALUES
('ABC123', 'elettrico'),
('XYZ789', 'benzina'),
('DEF456', 'diesel'),
('GHI789', 'ibrido');

-- Popolamento della tabella transiti
INSERT INTO transiti (targaVeicolo, varcoId, timestamp) VALUES
('ABC123', 1, '2024-01-15 08:30:00'),
('XYZ789', 2, '2024-01-16 09:45:00'),
('DEF456', 1, '2024-01-17 14:00:00'),
('GHI789', 3, '2024-01-18 10:15:00');

-- Popolamento della tabella multe
INSERT INTO multe (importo, pagamentoEffettuato, targaVeicolo, transitoId, dataMulta, uuidPagamento) VALUES
(100.00, false, 'ABC123', 1, '2024-01-16 12:00:00', 12345),
(150.00, true, 'XYZ789', 2, '2024-01-17 14:30:00', 12346),
(200.00, false, 'DEF456', 3, '2024-01-18 16:45:00', 12347);

-- Popolamento della tabella whitelist
INSERT INTO whitelist (targaVeicolo, dataScadenza) VALUES
('ABC123', '2024-12-31'),
('XYZ789', NULL);

-- Popolamento della tabella tariffa
INSERT INTO tariffa (tipoVeicolo, fasciaOraria, giornoFestivo, costo) VALUES
('elettrico', 'giorno', false, 2.50),
('benzina', 'notte', true, 3.00),
('diesel', 'giorno', false, 2.80),
('ibrido', 'ore_punta', true, 3.50),
('moto', 'giorno', false, 1.50),
('furgone', 'notte', true, 4.00);

-- Popolamento della tabella users
INSERT INTO users (username, email, token, role) VALUES
('john_doe', 'john@example.com', 1234567890, 'USER'),
('jane_smith', 'jane@example.com', 9876543210, 'ADMIN'),
('alice_jones', 'alice@example.com', 5432167890, 'SUPER_ADMIN');
