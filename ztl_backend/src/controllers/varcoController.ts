// src/controllers/VarcoController.ts

import { Request, Response } from 'express';
import VarcoDAO from '../dao/varcoDAO'; // Importa il DAO

export const createVarco = async (req: Request, res: Response): Promise<void> => {
  try {
    const newVarco = await VarcoDAO.create(req.body);
    res.status(201).json(newVarco);
  } catch (error) {
    res.status(500).json({ error: 'Error creating varco' });
  }
};

export const getVarchi = async (req: Request, res: Response): Promise<void> => {
  try {
    const Varco = await VarcoDAO.findAll();
    res.status(200).json(Varco);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching varchi' });
  }
};

export const getVarcoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const varco = await VarcoDAO.findById(Number(req.params.id));
    if (!varco) {
      res.status(404).json({ error: 'Varco not found' });
      return;
    }
    res.status(200).json(varco);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching varco' });
  }
};

export const updateVarco = async (req: Request, res: Response): Promise<void> => {
  try {
    const varco = await VarcoDAO.update(Number(req.params.id), req.body);
    res.status(200).json(varco);
  } catch (error) {
    res.status(500).json({ error: 'Error updating varco' });
  }
};

export const deleteVarco = async (req: Request, res: Response): Promise<void> => {
  try {
    await VarcoDAO.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting varco' });
  }
};

