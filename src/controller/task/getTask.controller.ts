import { Response, Request } from "express";
import prisma from "../../lib/prisma";


const GetTask = async (request: Request, response: Response) => {
    try {

        const { id } = request.query;

        if (!id || typeof id !== "string") {
            return response.status(400).json({ msg: "ID not provided" })
        }
        const task = await prisma.task.findUnique({
            where: { id: id },
        });

        if (!task) {
            return response.status(404).json({ message: "Task not found" });
        }
        return response.status(200).json({ task });
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
};

export default GetTask;
