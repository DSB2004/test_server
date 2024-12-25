import { Response, Request } from "express";
import prisma from "../../lib/prisma";
import { taskSchema } from "../../lib/zod";

const UpdateTask = async (request: Request, response: Response): Promise<any> => {
    try {

        const { title, body, status } = await request.body;
        const { id } = request.query;

        if (!id || typeof id !== "string") {
            return response.status(422).json({ msg: "ID is required" })
        }
        const validation = taskSchema.safeParse({ title, body, status })

        if (validation.error) {
            return response.status(422).json({ msg: "Validation failed", validation: validation.error })
        }

        const task = await prisma.task.update({
            data: { title, body, status },
            where: { id }
        });

        return response.status(200).json({ msg: "Task Updated", created_id: task.id });
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
};

export default UpdateTask;
