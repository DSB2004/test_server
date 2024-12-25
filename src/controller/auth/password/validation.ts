import z from 'zod';

const ResetPasswordSchema = z.object({
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


export default ResetPasswordSchema;
export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;