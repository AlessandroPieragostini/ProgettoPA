// src/controllers/transitoController.ts

import { Request, Response } from 'express';
import TransitoDAO from '../dao/transitoDAO'; // Importa il DAO
import Veicolo from '../models/veicolo';
import Whitelist from '../models/whitelist';
import ZTL from '../models/ztl';
import Varco from '../models/varco';
import { getGiorno, getOrario } from '../utils/manipolaData';
import { createMulta } from './multeController';

export const createTransito = async (req: Request, res: Response): Promise<void> => {
  try {
    const { targa, varcoId, dataOraPassaggio } = req.body;
    
    // Controlla se il veicolo esiste
    const veicolo = await Veicolo.findOne({ where: { targa } });
    if (!veicolo) {
      res.status(404).json({ error: 'Veicolo non trovato' });
      return;
    }

    // Crea il transito
    const nuovoTransito = await TransitoDAO.create({
      veicoloId: veicolo.targa,
      varcoId,
      dataOraPassaggio
    });

    const isWhiteListed = await Whitelist.findOne({ where: { targa: veicolo.targa } });
              
    if (isWhiteListed) {
      console.log(`Veicolo con targa ${veicolo.targa} è nella whitelist. Nessuna multa creata.`);
      return;
    }

    const giorno = getGiorno(nuovoTransito.dataOraTransito);
    const orario = getOrario(nuovoTransito.dataOraTransito);
    const varco = await Varco.findOne({ where: { id: nuovoTransito.varcoId } });
    const ztl = await ZTL.findOne({ where: { id: varco?.ztlId } });

    // Richiama la creazione della multa, se necessario
    if (ztl?.giorniAttivi.includes(giorno) && orario > ztl.orarioInizio && orario < ztl.orarioFine) {
      await createMulta(nuovoTransito, veicolo);
    };

    res.status(201).json(nuovoTransito);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella creazione del transito' });
  }
};

export const getTransitiByVeicolo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { targa } = req.params;

    const veicolo = await Veicolo.findOne({ where: { targa } });
    if (!veicolo) {
      res.status(404).json({ error: 'Veicolo non trovato' });
      return;
    }

    const transiti = await TransitoDAO.findAllByVeicolo(veicolo.targa);
    res.status(200).json(transiti);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei transiti' });
  }
};

export const getTransitiByVarco = async (req: Request, res: Response): Promise<void> => {
  try {
    const { varcoId } = req.params;

    const transiti = await TransitoDAO.findAllByVarco(Number(varcoId));
    
    if (transiti.length === 0) {
      res.status(404).json({ error: 'Nessun transito trovato per questo varco' });
      return;
    }

    res.status(200).json(transiti);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei transiti per il varco' });
  }
};

export const getTransitoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const transito = await TransitoDAO.findById(Number(id));
    if (!transito) {
      res.status(404).json({ error: 'Transito non trovato' });
      return;
    }

    res.status(200).json(transito);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del transito' });
  }
};

export const updateTransito = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { varcoId, dataOraPassaggio } = req.body;

    const transito = await TransitoDAO.update(Number(id), { varcoId, dataOraPassaggio });
    res.status(200).json(transito);
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento del transito' });
  }
};

export const deleteTransito = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await TransitoDAO.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'eliminazione del transito' });
  }
};
