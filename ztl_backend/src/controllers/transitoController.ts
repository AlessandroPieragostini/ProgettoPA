import { Request, Response } from 'express';
import { getGiorno, getOrario } from '../utils/manipolaData';
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import VarcoZTL from '../models/ZTL';
import Whitelist from '../models/whitelist';
import { createMulta } from './multeController';

// Crea un nuovo transito
export const createTransito = async (req: Request, res: Response): Promise<void> => {
  try {
    const { targa, varcoId, dataOraPassaggio } = req.body;
    
    // Controlla se il veicolo esiste
    const veicolo = await Veicolo.findOne({ where: { targa } });
    if (!veicolo) {
      res.status(404).json({ error: 'Veicolo non trovato' });
    }

    // Crea il transito
    const nuovoTransito = await Transito.create({
      veicoloId: veicolo?.targa, 
      varcoId,
      dataOraPassaggio
    });
    
    //è GIUSTO CHIAMARE CREATEMULTA ??
    createMulta(nuovoTransito.id);

    res.status(201).json(nuovoTransito); 
  } catch (error) {
    res.status(500).json({ error: 'Errore nella creazione del transito' });
  }
};

// Ottieni tutti i transiti di un veicolo (basato sulla targa)
export const getTransitiByVeicolo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { targa } = req.params;

    const veicolo = await Veicolo.findOne({ where: { targa } });
    if (!veicolo) {
      res.status(404).json({ error: 'Veicolo non trovato' });
      return; // return per uscire dalla funzione
    }

    // Trova tutti i transiti associati al veicolo
    const transiti = await Transito.findAll({ where: { veicoloId: veicolo.targa } });
    res.status(200).json(transiti); 
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei transiti' });
  }
};

// Ottieni tutti i transiti per un varco specifico
export const getTransitiByVarco = async (req: Request, res: Response): Promise<void> => {
  try {
    const { varcoId } = req.params;

    // Trova tutti i transiti associati al varco
    const transiti = await Transito.findAll({ where: { varcoId } });
    
    if (transiti.length === 0) {
      res.status(404).json({ error: 'Nessun transito trovato per questo varco' });
      return; // Aggiungi un return per uscire dalla funzione
    }

    res.status(200).json(transiti); // Restituisci la risposta
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei transiti per il varco' });
  }
};

// Ottieni un transito specifico per ID
export const getTransitoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const transito = await Transito.findByPk(id);
    if (!transito) {
      res.status(404).json({ error: 'Transito non trovato' });
      return; // Aggiungi un return per uscire dalla funzione
    }

    res.status(200).json(transito); // Restituisci la risposta
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del transito' });
  }
};

// Aggiorna un transito per ID
export const updateTransito = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { varcoId, dataOraPassaggio } = req.body;

    const transito = await Transito.findByPk(id);
    if (!transito) {
      res.status(404).json({ error: 'Transito non trovato' });
      return; // Aggiungi un return per uscire dalla funzione
    }

    // Aggiorna il transito
    await transito.update({ varcoId, dataOraPassaggio });
    res.status(200).json(transito); // Restituisci la risposta
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento del transito' });
  }
};

// Elimina un transito per ID
export const deleteTransito = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const transito = await Transito.findByPk(id);
    if (!transito) {
      res.status(404).json({ error: 'Transito non trovato' });
      return; // Aggiungi un return per uscire dalla funzione
    }

    // Elimina il transito
    await transito.destroy();
    res.status(204).send(); // Restituisci la risposta
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'eliminazione del transito' });
  }
};
