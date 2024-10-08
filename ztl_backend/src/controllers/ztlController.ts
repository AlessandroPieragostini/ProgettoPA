import { Request, Response } from 'express';
import ZTL from '../models/varco'; // Assicurati di avere il modello ZTL

export const createZTL = async (req: Request, res: Response): Promise<void> => {
  try {
    const newZTL = await ZTL.create(req.body);
    res.status(201).json(newZTL);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ZTL' });
  }
};

export const getZTLs = async (req: Request, res: Response): Promise<void> => {
  try {
    const ztls = await ZTL.findAll();
    res.status(200).json(ztls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ZTLs' });
  }
};

export const getZTLById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ztl = await ZTL.findByPk(req.params.id);
    if (!ztl) {
      res.status(404).json({ error: 'ZTL not found' });
      return; // Aggiungi un return per uscire dalla funzione
    }
    res.status(200).json(ztl);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ZTL' });
  }
};

export const updateZTL = async (req: Request, res: Response): Promise<void> => {
  try {
    const ztl = await ZTL.findByPk(req.params.id);
    if (!ztl) {
      res.status(404).json({ error: 'ZTL not found' });
      return; // Aggiungi un return per uscire dalla funzione
    }

    await ztl.update(req.body);
    res.status(200).json(ztl);
  } catch (error) {
    res.status(500).json({ error: 'Error updating ZTL' });
  }
};

export const deleteZTL = async (req: Request, res: Response): Promise<void> => {
  try {
    const ztl = await ZTL.findByPk(req.params.id);
    if (!ztl) {
      res.status(404).json({ error: 'ZTL not found' });
      return; // Aggiungi un return per uscire dalla funzione
    }

    await ztl.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting ZTL' });
  }
};
