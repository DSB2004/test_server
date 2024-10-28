import { z } from "zod"

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string(),
    status: z.enum([
        "TODO",
        "IN_PROGRESS",
        "DONE",
        "BLOCKED",
        "REVIEW",
        "ON_HOLD", "CANCELLED"
    ]),
})

export { taskSchema };