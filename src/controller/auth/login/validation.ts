import z from 'zod';

const LogInSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Password must contain at least one special character"),
});


export default LogInSchema;
export type LogInFormData = z.infer<typeof LogInSchema>;
