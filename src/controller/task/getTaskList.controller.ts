import { Response, Request } from "express";
import prisma from "../../lib/prisma";

const GetTaskList = async (request: Request, response: Response): Promise<any> => {
    try {
        const page = Number(request.query['page']) || 1;
        const pageSize = 10;

        const skip = (page - 1) * pageSize;

        const tasks = await prisma.task.findMany({
            select: {
                id: true,
                title: true,
                status: true,
            },
            skip: skip,
            take: pageSize,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalPage = Math.max(Math.ceil(await prisma.task.count() / 10), 1)
        return response.status(200).json({
            tasks,
            pageSize: Math.min(pageSize, tasks.length),
            previousPage: page > 0 ? page - 1 : null,
            currentPage: page,
            nextPage: tasks.length === pageSize ? page + 1 : null,
            totalPage
        });
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
};

export default GetTaskList;
