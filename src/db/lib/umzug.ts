import { sequelize } from "./sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const umzug = new Umzug({
  context: sequelize.getQueryInterface(),
  migrations: { glob: ['../migrations/*.ts', { cwd: __dirname }] },
  logger: console,
  storage: new SequelizeStorage({ sequelize }),
});

export type Migration = typeof umzug._types.migration;

export default umzug;
