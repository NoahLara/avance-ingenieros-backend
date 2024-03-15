import { DataSource } from "typeorm";
import { AUTH_TOKENS, ROLES, USERS, USERS_ROLES } from "./entities";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "nlara99",
  password: "Myhero07",
  port: 5432,
  database: "avance-ingenieros",
  entities: [USERS, ROLES, AUTH_TOKENS, USERS_ROLES],
  synchronize: true,
});

export default AppDataSource;
