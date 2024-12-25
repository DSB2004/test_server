import { error } from "console";
import { ZodError } from "zod";

const convertZodError = (errors: ZodError) => {

    const formattedErrors = errors.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
    }));
    return {
        msg: "Invalid request format",
        errors: formattedErrors,
    };

};

export default convertZodError;
