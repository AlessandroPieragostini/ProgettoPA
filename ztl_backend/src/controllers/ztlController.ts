// src/controllers/ztlController.ts

import { Request, Response } from 'express';
import ztlDAO from '../dao/ztlDAO'; // Importa il DAO

export const createZTL = async (req: Request, res: Response): Promise<void> => {
  try {
    const newZTL = await ztlDAO.create(req.body);
    res.status(201).json(newZTL);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ZTL' });
  }
};

export const getZTLs = async (req: Request, res: Response): Promise<void> => {
  try {
    const ztls = await ztlDAO.findAll();
    res.status(200).json(ztls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ZTLs' });
  }
};

export const getZTLById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ztl = await ztlDAO.findById(Number(req.params.id));
    if (!ztl) {
      res.status(404).json({ error: 'ZTL not found' });
      return;
    }
    res.status(200).json(ztl);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ZTL' });
  }
};

export const updateZTL = async (req: Request, res: Response): Promise<void> => {
  try {
    const ztl = await ztlDAO.update(Number(req.params.id), req.body);
    res.status(200).json(ztl);
  } catch (error) {
    res.status(500).json({ error: 'Error updating ZTL' });
  }
};

export const deleteZTL = async (req: Request, res: Response): Promise<void> => {
  try {
    await ztlDAO.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting ZTL' });
  }
};
