CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    token VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('utente', 'operatore', 'admin')), -- Modifica a seconda dei ruoli definiti in UserRole
    credit DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creazione della tabella ZTL (Zone a Traffico Limitato)
CREATE TABLE IF NOT EXISTS ztl (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descrizione TEXT,
    orario_inizio VARCHAR(10) NOT NULL,
    orario_fine VARCHAR(10) NOT NULL,
    giorni_attivi JSONB NOT NULL,
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
    utente_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tipo_veicolo VARCHAR(50) NOT NULL CHECK (tipo_veicolo IN ('elettrico', 'benzina', 'diesel', 'ibrido', 'moto', 'furgone')),
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
    targa_veicolo VARCHAR(255) NOT NULL REFERENCES veicolo(targa) ON DELETE CASCADE,
    transito_id INT NOT NULL REFERENCES transito(id) ON DELETE CASCADE,
    data_multa TIMESTAMP NOT NULL,
    uuid_pagamento VARCHAR(255) NOT NULL,
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


-- Popolamento della tabella users
INSERT INTO users (username, email, token, role, credit) VALUES
('john_doe', 'john@example.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoib3BlcmF0b3JlIn0.rBR65zIisYprvvFyw2FBkiQVXUSyD_6XypVlazmtj1E', 'operatore', 0),
('jane_smith', 'jane@example.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImphbmVAZXhhbXBsZS5jb20iLCJyb2xlIjoidXRlbnRlIn0.5BeOkinF64Gy6GC54UmjI5bjGrbkZD9DIyJEm4Fm_RM', 'utente', 0),
('alice_jones', 'alice@example.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.pAzAl9RaK_3xNzMernnVwhEcIVsGl0OFfzkPhqo9SL0', 'admin', 0);

-- Popolamento della tabella ztl
INSERT INTO ztl (nome, descrizione, orario_inizio, orario_fine, giorni_attivi)
VALUES 
('Centro Storico', 'Zona a traffico limitato nel centro città', '08:00', '20:00', '["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]'),
('Zona Universitaria', 'Zona a traffico limitato per il campus universitario', '07:00', '19:00', '["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]'),
('Mercato', 'Zona a traffico limitato durante il mercato settimanale', '06:00', '14:00', '["Sabato", "Domenica"]'),
('Zona Turistica', 'Zona a traffico limitato nelle aree turistiche', '09:00', '22:00', '["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]'),
('Viale dei Giardini', 'Zona a traffico limitato nel parco cittadino', '10:00', '18:00', '["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]'),
('Stazione Centrale', 'Zona a traffico limitato intorno alla stazione', '05:00', '23:00', '["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]'),
('Centro Commerciale', 'Zona a traffico limitato intorno al centro commerciale', '10:00', '21:00', '["Sabato", "Domenica"]'),
('Zona Artigianale', 'Zona a traffico limitato nelle aree artigianali', '08:00', '17:00', '["Martedì", "Giovedì", "Venerdì"]');

-- Popolamento della tabella varco
INSERT INTO varco (location, ztl_id) VALUES
('Via Roma', 1),
('Piazza della Libertà', 1),
('Viale Università', 2);

-- Popolamento della tabella veicolo
INSERT INTO veicolo (targa, utente_id, tipo_veicolo) VALUES
('ABC123', 2, 'elettrico'),
('XYZ789', 3, 'benzina'),
('DEF456', 2, 'diesel'),
('GHI789', 1, 'ibrido');

-- Popolamento della tabella transito
INSERT INTO transito (targa_veicolo, varco_id, data_ora_transito) VALUES
('ABC123', 1, '2024-01-15 08:30:00'),
('XYZ789', 2, '2024-01-16 09:45:00'),
('DEF456', 1, '2024-01-17 14:00:00'),
('GHI789', 3, '2024-01-18 10:15:00');

-- Popolamento della tabella multa
INSERT INTO multa (importo, pagato, targa_veicolo, transito_id, data_multa, uuid_pagamento) VALUES
(100.00, false, 'ABC123', 1, '2024-01-16 12:00:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
(150.00, true, 'XYZ789', 2, '2024-01-17 14:30:00', '9e107d9d-372b-4984-b9d2-67d9a5f57487'),
(200.00, false, 'DEF456', 3, '2024-01-18 16:45:00', 'fa17cb9a-eeb1-40e7-bfab-13f587d1b6cc');

-- Popolamento della tabella whitelist
INSERT INTO whitelist (targa_veicolo, data_scadenza) VALUES
('ABC123', '2024-12-31'),
('XYZ789', NULL);


