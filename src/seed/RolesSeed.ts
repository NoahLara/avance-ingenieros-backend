import AppDataSource from "../db";
import { ROLES } from "../entities";
import { roles_data } from "./data";

export class RolesSeed {
  async run(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // Establecer la conexión con la base de datos
        await AppDataSource.initialize();

        // Iterar sobre los datos de usuario y guardarlos en la base de datos
        for (const rolInfo of roles_data) {
          const rol = new ROLES();
          rol.name = rolInfo.name;
          await rol.save();
        }

        console.log(".:|Seed Roles executed successfuly|:.");
      } catch (error) {
        console.error("Error Seed Roles:", error);
        reject();
      } finally {
        // Destruir la conexión con la base de datos después de completar todas las operaciones
        await AppDataSource.destroy();
        resolve();
      }
    });
  }
}
