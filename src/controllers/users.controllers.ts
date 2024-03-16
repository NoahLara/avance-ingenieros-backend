import { Request, Response } from "express";
import { DefaultResponse } from "../interfaces/default-response.interface";
import { USERS } from "../database/entities";

let defaultResponse: DefaultResponse<any> = {
  success: false,
  message: "",
  data: null,
};

export const getUsers = async (req: Request, res: Response) => {
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

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { username, password, email } = req.body;


    const user = new USERS();
    user.username = username;
    user.password = password;
    user.email = email;
    await user.save();

    defaultResponse.data = user;
    defaultResponse.message = "user created successfully";
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
