
-- Creazione della tabella ZTL (Zone a Traffico Limitato)
CREATE TABLE IF NOT EXISTS ztl (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descrizione TEXT,
    orario_inizio VARCHAR(10) NOT NULL,
    orario_fine VARCHAR(10) NOT NULL,
    giorni_attivi VARCHAR(10) NOT NULL,
    CONSTRAINT chk_day CHECK (giorni_attivi IN ('Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Varco (Varchi associati a ZTL)
CREATE TABLE IF NOT EXISTS varco (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    ztl_id INT REFERENCES ztl(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Veicolo (veicolo che transitano attraverso i varchi)
CREATE TABLE IF NOT EXISTS veicolo (
    targa VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL,
    tipo_veicolo VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Transito (transito registrati per ciascun veicolo attraverso i varchi)
CREATE TABLE IF NOT EXISTS transito (
    id SERIAL PRIMARY KEY,
    targa_veicolo VARCHAR(255) REFERENCES veicolo(targa) ON DELETE CASCADE,
    varco_id INT REFERENCES varco(id) ON DELETE CASCADE,
    data_ora_transito TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella Multa (multa associate ai transito non autorizzati)
CREATE TABLE IF NOT EXISTS multa (
    id SERIAL PRIMARY KEY,
    importo DECIMAL(10, 2) NOT NULL,
    pagato BOOLEAN DEFAULT FALSE,
    targa_veicolo VARCHAR(255) REFERENCES veicolo(targa) ON DELETE CASCADE,
    transito_id INT REFERENCES transito(id) ON DELETE CASCADE,
    data_multa TIMESTAMP,
    uuid_pagamento INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whitelist (
    targa_veicolo VARCHAR(255) PRIMARY KEY,
    data_scadenza TIMESTAMP NULL,
    FOREIGN KEY (targa_veicolo) REFERENCES veicolo(targa),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE IF NOT EXISTS tariffa (
    id_tariffa SERIAL PRIMARY KEY,
    tipo_veicolo VARCHAR(50) NOT NULL CHECK (tipo_veicolo IN ('elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone')),
    fascia_oraria VARCHAR(20) NOT NULL CHECK (fascia_oraria IN ('giorno', 'notte', 'ore_punta')),
    giorno_festivo BOOLEAN NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    token DECIMAL NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('utente', 'operatore')), -- Modifica a seconda dei ruoli definiti in UserRole
    credit DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Popolamento iniziale delle tabelle con dati di esempio
-- Popolamento della tabella ztl
INSERT INTO ztl (nome, descrizione, orario_inizio, orario_fine, giorni_attivi) VALUES
('Centro Storico', 'Zona a traffico limitato nel centro città', '08:00', '20:00', 'Lunedì'),
('Zona Universitaria', 'Zona a traffico limitato per il campus universitario', '07:00', '19:00', 'Martedì'),
('Mercato', 'Zona a traffico limitato durante il mercato settimanale', '06:00', '14:00', 'Sabato');

-- Popolamento della tabella varco
INSERT INTO varco (location, ztl_id) VALUES
('Via Roma', 1),
('Piazza della Libertà', 1),
('Viale Università', 2);

-- Popolamento della tabella veicolo
INSERT INTO veicolo (targa, tipo_veicolo) VALUES
('ABC123', 'elettrico'),
('XYZ789', 'benzina'),
('DEF456', 'diesel'),
('GHI789', 'ibrido');

-- Popolamento della tabella transito
INSERT INTO transito (targa_veicolo, varco_id, data_ora_transito) VALUES
('ABC123', 1, '2024-01-15 08:30:00'),
('XYZ789', 2, '2024-01-16 09:45:00'),
('DEF456', 1, '2024-01-17 14:00:00'),
('GHI789', 3, '2024-01-18 10:15:00');

-- Popolamento della tabella multa
INSERT INTO multa (importo, pagato, targa_veicolo, transito_id, data_multa, uuid_pagamento) VALUES
(100.00, false, 'ABC123', 1, '2024-01-16 12:00:00', 12345),
(150.00, true, 'XYZ789', 2, '2024-01-17 14:30:00', 12346),
(200.00, false, 'DEF456', 3, '2024-01-18 16:45:00', 12347);

-- Popolamento della tabella whitelist
INSERT INTO whitelist (targa_veicolo, data_scadenza) VALUES
('ABC123', '2024-12-31'),
('XYZ789', NULL);

-- Popolamento della tabella tariffa
INSERT INTO tariffa (tipo_veicolo, fascia_oraria, giorno_festivo, costo) VALUES
('elettrico', 'giorno', false, 2.50),
('benzina', 'notte', true, 3.00),
('diesel', 'giorno', false, 2.80),
('ibrido', 'ore_punta', true, 3.50),
('moto', 'giorno', false, 1.50),
('furgone', 'notte', true, 4.00);

-- Popolamento della tabella users
INSERT INTO users (username, email, token, role, credit) VALUES
('john_doe', 'john@example.com', 1234567890, 'utente', 0),
('jane_smith', 'jane@example.com', 9876543210, 'operatore', 0),
('alice_jones', 'alice@example.com', 5432167890, 'operatore', 0);
