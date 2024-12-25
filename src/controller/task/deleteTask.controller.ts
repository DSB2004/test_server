import { Response, Request } from "express";
import prisma from "../../lib/prisma";


const DeleteTask = async (request: Request, response: Response): Promise<any> => {
    try {

        const { id } = request.query;

        if (!id || typeof id !== "string") {
            return response.status(400).json({ msg: "ID not provided" })
        }
        await prisma.task.delete({
            where: { id: id },
        });

        return response.status(200).json({ delete_id: id });
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
};

export default DeleteTask;
