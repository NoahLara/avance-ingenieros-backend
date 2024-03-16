import { NextFunction, Request, Response } from "express";
import { parseISO } from "date-fns";
import { AUTH_TOKENS } from "../database/entities";
import { DefaultResponse } from "../interfaces/default-response.interface";

const defaultResponse: DefaultResponse<any> = {
  success: false,
  message: "",
  data: null,
};

// Middleware para verificar si el token ha expirado
export const checkTokenExpiration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const accessToken = req.headers.authorization;

  if (!accessToken) {
    defaultResponse.data = null;
    defaultResponse.message = "Token access no attached";
    defaultResponse.success = false;
    return res.status(401).json(defaultResponse);
  }

  try {
    // Consultar la base de datos para obtener el token y su fecha de expiración
    const authToken = await AUTH_TOKENS.findOne({
      where: { token: accessToken },
    });

    if (!authToken) {
      defaultResponse.data = null;
      defaultResponse.message = "Token access is no valid";
      defaultResponse.success = false;
      return res.status(401).json(defaultResponse);
    }

    // Obtener la fecha de expiración del token
    const expirationTime = authToken.expires_at;

    // Fecha y hora actuales
    const now = new Date();

    // Verificar si el token ha expirado
    if (expirationTime && parseISO(expirationTime) < now) {
      defaultResponse.data = null;
      defaultResponse.message = "Token access has expired";
      defaultResponse.success = false;
      return res.status(401).json(defaultResponse);
    }

    // Si el token todavía es válido, pasar al siguiente middleware
    next();
  } catch (error) {
    console.error("Error when virify token access:", error);
    defaultResponse.data = null;
    defaultResponse.message = "Internal Server Error";
    defaultResponse.success = false;
    return res.status(500).json(defaultResponse);
  }
};
