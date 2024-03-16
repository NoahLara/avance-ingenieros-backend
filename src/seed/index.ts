import AppDataSource from "../database/db";
import { RolesSeed } from "./RolesSeed";
import { UserRolesSeed } from "./UserRolesSeed";
import { UsersSeed } from "./UsersSeed";

async function runSeeds() {
  try {
    //Limpiar base
    await AppDataSource.initialize();
    await AppDataSource.synchronize(true);
    await AppDataSource.destroy();

    // Ejecutar los seeds de usuarios
    const usersSeed = new UsersSeed();
    await usersSeed.run();

    // Ejecutar los seeds de roles
    const rolesSeed = new RolesSeed();
    await rolesSeed.run();

    // Ejecutar los seeds para asignacion de roles a usuarios
    const userRolesSeed = new UserRolesSeed();
    await userRolesSeed.run();

    console.log("Seed Execution Completed Successfully");
  } catch (error) {
    console.error("Error executing seeds:", error);
  }
}

// Ejecutar la función para iniciar los seeds
runSeeds();
