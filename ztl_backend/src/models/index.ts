// src/models/index.ts
import Veicolo from './veicolo';
import VarcoZTL from './varcoZTL';
import Transito from './transito';
import Multa from './multa';
import Whitelist from './whitelist';
import Tariffa from './tariffa';

// Un Veicolo può avere più transiti
Veicolo.hasMany(Transito, { foreignKey: 'targaVeicolo' });
Transito.belongsTo(Veicolo, { foreignKey: 'targaVeicolo' });

// Un VarcoZTL può essere attraversato da più transiti
VarcoZTL.hasMany(Transito, { foreignKey: 'idVarco' });
Transito.belongsTo(VarcoZTL, { foreignKey: 'idVarco' });

// Un Veicolo può avere più multe
Veicolo.hasMany(Multa, { foreignKey: 'targaVeicolo' });
Multa.belongsTo(Veicolo, { foreignKey: 'targaVeicolo' });

// Un veicolo può essere nella Whitelist
Veicolo.hasOne(Whitelist, { foreignKey: 'targaVeicolo' });
Whitelist.belongsTo(Veicolo, { foreignKey: 'targaVeicolo' });

// Tariffa è associata al tipo di veicolo
Tariffa.belongsTo(Veicolo, { foreignKey: 'tipoVeicolo', targetKey: 'tipoVeicolo' });