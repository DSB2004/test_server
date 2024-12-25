import { z } from 'zod';

const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),

    username: z.string().min(1, "Username is required"),

    email: z.string().email("Invalid email address").min(1, "Email is required"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Password must contain at least one special character"),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default SignUpSchema;
export type SignUpFormData = z.infer<typeof SignUpSchema>;
