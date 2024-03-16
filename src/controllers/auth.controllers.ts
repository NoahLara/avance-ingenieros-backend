import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { addMinutes } from "date-fns";
import config from "../config/config";
import { USERS, AUTH_TOKENS } from "../database/entities";
import { DefaultResponse } from "../interfaces/default-response.interface";

const defaultResponse: DefaultResponse<any> = {
  success: false,
  message: "",
  data: null,
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos
    const user = await USERS.findOne({ where: { username } });

    // Verificar si el usuario existe y si la contraseña coincide
    if (!user || user.password !== password) {
      defaultResponse.message = "Invalid username or password";
      return res.status(401).json(defaultResponse);
    }

    // Generar token de acceso
    const accessToken = jwt.sign(
      { username: user.username },
      config.auth.jwtSecret,
      { expiresIn: `${config.auth.jwtTimeExpirationMinutes}m` }
    );

    // Guardar el token en la base de datos
    const authToken = new AUTH_TOKENS();
    authToken.token = accessToken;
    authToken.user = user;
    authToken.expires_at = addMinutes(
      new Date(),
      config.auth.jwtTimeExpirationMinutes
    ).toISOString();
    await authToken.save();

    defaultResponse.success = true;
    defaultResponse.message = "Authentication successful";
    defaultResponse.data = { accessToken };

    return res.status(200).json(defaultResponse);
  } catch (error) {
    defaultResponse.message = "Internal server error";
    return res.status(500).json(defaultResponse);
  }
};
