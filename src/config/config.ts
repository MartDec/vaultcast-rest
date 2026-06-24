import dotenv from 'dotenv';

dotenv.config();
const Booleans = [true, 1, '1', 'true', 'True', 'TRUE'];
const isTrue = (variable: string | undefined) => Booleans.includes(variable || 'false');

export default {
  session: {
    jwtSecret: process.env.JWT_SECRET,
  },

  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  },

  sequelize: {
    migration: {
      // if true => `sequelize-cli db:migrate`
      up: isTrue(process.env.SEQUELIZE_MIGRATION_UP ?? 'true'),
      // if true => `sequelize-cli db:migrate:undo`
      down: isTrue(process.env.SEQUELIZE_MIGRATION_DOWN),
      // NOTE: nothing will happen if `up` and `down` are both `true`
    },
    // seeds: {
    //   // if true => `sequelize-cli db:seed:all`
    //   up: isTrue(process.env.SEQUELIZE_SEEDS_UP ?? 'true'),
    //   // if true => `sequelize-cli db:seed:undo`
    //   down: isTrue(process.env.SEQUELIZE_SEEDS_DOWN),
    // },
    demoTimeoutMS: 0,
  },
}
