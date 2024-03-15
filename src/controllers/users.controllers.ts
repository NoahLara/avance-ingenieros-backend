import { Request, Response } from "express";
import { DefaultResponse } from "../interfaces/default-response.interface";
import { USERS } from "../database/entities";

export const getUsers = async (req: Request, res: Response) => {
  let defaultResponse: DefaultResponse<any> = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const users = await USERS.find();
    defaultResponse.data = users;
    defaultResponse.message = "all users list";
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
