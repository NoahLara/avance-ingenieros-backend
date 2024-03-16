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
    defaultResponse.message = "All users list";
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
