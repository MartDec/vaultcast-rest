import config from "../config/config";
import umzug from "./lib/umzug";

export async function performMigrations() {
  try {
    const pendingMigrationCount = (await umzug.pending()).length;
    if (config.sequelize.migration.up && !!pendingMigrationCount) {
      await umzug.up();
    } else if (config.sequelize.migration.down) {
      await umzug.down();
    }
  } catch (error: any) {
    console.error('ERROR', error);
  }
}
