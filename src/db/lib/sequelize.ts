import { Options, Sequelize, Transaction } from "sequelize";
import config from '../config_db';

const sequelize = new Sequelize(config as Options);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Synchroniser les modèles (attention en production, utilisez les migrations)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Models synchronized.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}

export { sequelize, Sequelize };
