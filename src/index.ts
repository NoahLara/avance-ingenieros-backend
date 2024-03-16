import "reflect-metadata"; 
import app from "./app";
import config from "../src/config/config";
import AppDataSource from "./database/db";

async function starApp() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
    app.listen(config.serverPort);
    console.log("Server is listening on port", config.serverPort);
  } catch (error) {
    console.log("Error connecting database");
    console.log(error);
  }
}

starApp();
