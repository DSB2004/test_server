import { Response, Request } from "express";
import prisma from "../../lib/prisma";
import { taskSchema } from "../../lib/zod";

const AddTask = async (request: Request, response: Response): Promise<any> => {
    try {

        const { title, body, status = "TODO" } = request.body;

        const validation = taskSchema.safeParse({ title, body, status })

        if (!validation.success) {
            return response.status(422).json({ msg: "Validation failed", validation: validation.error.errors })
        }

        const task = await prisma.task.create({
            data: { title, body, status }
        });

        return response.status(201).json({ msg: "Task created", created_id: task.id });
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
};

export default AddTask;
