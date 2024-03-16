import { DataSource } from "typeorm";
import config from "../config/config";
import { AUTH_TOKENS, ROLES, USERS, USERS_ROLES } from "./entities";

const AppDataSource = new DataSource({
  type:         config.database.type as "postgres",
  host:         config.database.host,
  username:     config.database.username,
  password:     config.database.password,
  port:         config.database.port,
  database:     config.database.database,
  synchronize:  config.database.synchronize,
  entities:     [USERS, ROLES, AUTH_TOKENS, USERS_ROLES],
});

export default AppDataSource;
