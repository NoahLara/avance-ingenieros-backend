import AppDataSource from "../database/db";
import { USERS_ROLES, USERS, ROLES } from "../database/entities";
import { user_data } from "./data";

export class UserRolesSeed {
  async run(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // Establecer la conexión con la base de datos
        await AppDataSource.initialize();

        // Obtener el rol de administrador
        const adminRole = await ROLES.findOne({
          where: { name: "Administrador" },
        });

        // Obtener el rol de empleado
        const employeeRole = await ROLES.findOne({
          where: { name: "Empleado" },
        });

        // Si no se encuentra el rol de administrador, mostrar un error y rechazar la promesa
        if (!adminRole) {
          console.error(
            "El rol de administrador no está definido en la base de datos."
          );
          reject();
          return;
        }

        // Obtener todos los usuarios
        const users = await USERS.find();

        // Por cada usuario, asignar roles
        for (const user of users) {
          // Si el usuario es "Rafael Colato", asignar el rol de administrador
          if (user.username === "Rafael Colato") {
            const userRole = new USERS_ROLES();
            userRole.user_id = user.id;
            userRole.role_id = adminRole.id;
            await userRole.save();

            const roleUser = new USERS_ROLES();
            userRole.user_id = user.id;
            userRole.role_id = employeeRole?.id || "empl2024";
            await userRole.save();
          } else {
            // Si no es "RAFAL COLATO", asignar un rol aleatorio
            const roles = await ROLES.find();
            const randomRole = roles[Math.floor(Math.random() * roles.length)];
            const userRole = new USERS_ROLES();
            userRole.user_id = user.id;
            userRole.role_id = randomRole.id;
            await userRole.save();
          }
        }

        console.log(".:|Seed Asignation user-roles executed successfully|:.");
      } catch (error) {
        console.error("Error seeding user roles:", error);
        reject();
      } finally {
        // Destruir la conexión con la base de datos después de completar todas las operaciones
        await AppDataSource.destroy();
        resolve();
      }
    });
  }
}
