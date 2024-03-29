import { Request, Response } from "express";
import { DefaultResponse } from "../interfaces/default-response.interface";
import { USERS, USERS_ROLES } from "../database/entities";
import AppDataSource from "../database/db";

let defaultResponse: DefaultResponse<any> = {
  success: false,
  message: "",
  data: null,
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Consultar la base de datos para obtener los usuarios y sus roles asociados
    const usersWithRoles = await USERS_ROLES.createQueryBuilder("users_roles")
      .leftJoinAndSelect("users_roles.user", "users")
      .leftJoinAndSelect("users_roles.role", "roles")
      .getMany();

    // Crear un mapa para almacenar los usuarios únicos con sus roles
    const usersMap = new Map<string, any>(); // Utilizamos un Map para almacenar usuarios únicos por su ID

    // Iterar sobre los resultados de la consulta y agregar los roles a cada usuario en el mapa
    usersWithRoles.forEach((userRole) => {
      const userId = userRole.user.id;
      if (!usersMap.has(userId)) {
        // Si el usuario no está en el mapa, lo agregamos con sus roles
        usersMap.set(userId, {
          id: userRole.user.id,
          username: userRole.user.username,
          email: userRole.user.email,
          roles: [], // Inicializamos un array para almacenar los roles del usuario
        });
      }
      // Agregamos el rol al usuario en el mapa
      usersMap.get(userId).roles.push(userRole.role.name);
    });

    // Convertir el mapa a un array de usuarios
    const usersData = Array.from(usersMap.values());

    // Preparar la respuesta
    const defaultResponse: DefaultResponse<any> = {
      success: true,
      message: "All users list with roles",
      data: usersData,
    };

    // Enviar la respuesta
    return res.status(200).json(defaultResponse);
  } catch (error) {
    // Manejar errores
    const defaultResponse: DefaultResponse<any> = {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
      data: null,
    };

    return res.status(500).json(defaultResponse);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await USERS.findOne({ where: { id } });

    if (!user) {
      defaultResponse.data = null;
      defaultResponse.success = false;
      defaultResponse.message = "User not found";

      return res.status(404).json(defaultResponse);
    }

    defaultResponse.data = user;
    defaultResponse.message = "User found";
    defaultResponse.success = true;

    return res.status(200).json(defaultResponse);
  } catch (error) {
    if (error instanceof Error) {
      defaultResponse.data = null;
      defaultResponse.success = false;
      defaultResponse.message = error.message;

      return res.status(500).json(defaultResponse);
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const user = new USERS();
    user.username = username;
    user.password = password;
    user.email = email;
    await user.save();

    defaultResponse.data = user;
    defaultResponse.message = "User created successfully";
    defaultResponse.success = true;

    return res.status(200).json(defaultResponse);
  } catch (error) {
    if (error instanceof Error) {
      defaultResponse.data = null;
      defaultResponse.success = false;
      defaultResponse.message = error.message;

      return res.status(500).json(defaultResponse);
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;

    const user = await USERS.findOne({ where: { id } });
    if (!user) {
      defaultResponse.data = null;
      defaultResponse.success = false;
      defaultResponse.message = "User not found";

      return res.status(404).json(defaultResponse);
    }

    user.username = username || user.username;
    user.password = password || user.password;
    user.email = email || user.email;

    await user.save();

    defaultResponse.data = user;
    defaultResponse.message = "User updated successfully";
    defaultResponse.success = true;

    return res.status(200).json(defaultResponse);
  } catch (error) {
    if (error instanceof Error) {
      defaultResponse.data = null;
      defaultResponse.success = false;
      defaultResponse.message = error.message;

      return res.status(500).json(defaultResponse);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await USERS.findOne({ where: { id } });
    if (!user) {
      defaultResponse.data = null;
      defaultResponse.success = false;
      defaultResponse.message = "User not found";

      return res.status(404).json(defaultResponse);
    }

    await user.remove();

    defaultResponse.data = null;
    defaultResponse.message = "User deleted successfully";
    defaultResponse.success = true;

    return res.status(200).json(defaultResponse);
  } catch (error) {
    if (error instanceof Error) {
      defaultResponse.data = null;
      defaultResponse.success = false;
      defaultResponse.message = error.message;

      return res.status(500).json(defaultResponse);
    }
  }
};
