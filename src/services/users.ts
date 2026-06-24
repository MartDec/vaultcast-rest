import { sequelize } from "../db/lib/sequelize";
import User from "../db/models/User";
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function createUser({ email, username, password }: { email: string, username: string, password: string }) {
  const t = await sequelize.transaction();
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create(
      { email, username, password: hash },
      { transaction: t },
    );

    await t.commit();
    return user;
  } catch (error: any) {
    await t.rollback();
    if (error.errors.length) {
      throw error.errors.map(
        (err: any) => ({ name: error.name, message: err.message }),
      );
    } else {
      throw {
        name: 'VaultcastGenericError',
        message: 'an error occured while trying to create user ' + username,
      }
    }
  }
}
