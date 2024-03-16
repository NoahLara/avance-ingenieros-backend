const config = {
  database: {
    type: "postgres",
    host: "localhost",
    username: "nlara99",
    password: "Myhero07",
    database: "avance-ingenieros",
    port: 5432,
    synchronize: true,
  },
  auth: {
    jwtSecret: "C8n$Uh3]u17k",
    jwtTimeExpirationMinutes: 15,
  },
  serverPort: 3000,
};

export default config;
