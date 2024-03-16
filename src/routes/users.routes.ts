import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.controllers";
import { checkTokenExpiration } from "../middlewares/check-token.middleware";

const router = Router();

router.get("/users", checkTokenExpiration, getUsers); // Endpoint para obtener todos los usuarios
router.get("/users/:id", checkTokenExpiration, getUserById); // Endpoint para obtener un usuario por ID
router.post("/users", checkTokenExpiration, createUser); // Endpoint para crear un nuevo usuario
router.put("/users/:id", checkTokenExpiration, updateUser); // Endpoint para actualizar un usuario por ID
router.delete("/users/:id", checkTokenExpiration, deleteUser); // Endpoint para eliminar un usuario por ID

export default router;
