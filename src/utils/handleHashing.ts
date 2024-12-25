import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) => {
    return await hash(password, 10);

}

export const comparePassword = async (userPassword: string, dbPassowrd: string) => {
    return await compare(userPassword, dbPassowrd);
}

