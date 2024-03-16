import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.controllers";

const router = Router();

router.get("/users", getUsers); // Endpoint para obtener todos los usuarios
router.get("/users/:id", getUserById); // Endpoint para obtener un usuario por ID
router.post("/users", createUser); // Endpoint para crear un nuevo usuario
router.put("/users/:id", updateUser); // Endpoint para actualizar un usuario por ID
router.delete("/users/:id", deleteUser); // Endpoint para eliminar un usuario por ID

export default router;
