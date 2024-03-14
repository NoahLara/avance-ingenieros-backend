import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "nlara99",
  password: "Myhero07",
  port: 5432,
  database: "avance-ingenieros",
  entities: [],
});

export default AppDataSource;
