import AppDataSource from "../db";
import { USERS } from "../entities";
import { user_data } from "./data";

export class UsersSeed {
  async run(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // Establecer la conexión con la base de datos
        await AppDataSource.initialize();

        // Iterar sobre los datos de usuario y guardarlos en la base de datos
        for (const userInfo of user_data) {
          const user = new USERS();
          user.username = userInfo.username;
          user.password = userInfo.password;
          user.email = userInfo.email;
          await user.save();
        }

        console.log(".:|Seed Users executed successfuly|:.");
      } catch (error) {
        console.error("Error Seed Users:", error);
        reject();
      } finally {
        // Destruir la conexión con la base de datos después de completar todas las operaciones
        await AppDataSource.destroy();
        resolve();
      }
    });
  }
}
