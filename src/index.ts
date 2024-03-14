import "reflect-metadata";
import app from "./app";
import AppDataSource from "./db";

async function starApp() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
    app.listen(3000);
    console.log("Server is listening on port", 3000);
  } catch (error) {
    console.log("Error connecting database");
    console.log(error);
  }
}

starApp();
