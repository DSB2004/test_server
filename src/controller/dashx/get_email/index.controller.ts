import prisma from "../../../lib/prisma";
import { Response, Request } from "express";

export const ADD_EMAIL_CONTROLLER = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send("Email not added");
    }

    await prisma.dashx_email.create({
      data: { email },
    });

    return res.status(201).send("Email added");
  } catch (error) {
    console.error("Error adding email:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const GET_EMAIL = async (req: Request, res: Response): Promise<any> => {
  try {
    const emails = await prisma.dashx_email.findMany();
    return res.status(200).json({ emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return res.status(500).send("Internal Server Error");
  }
};
