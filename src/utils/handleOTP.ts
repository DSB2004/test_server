import { totp } from "otplib";

const JWT_SECRET = process.env.JWT_SECRET || ""; // Fallback to empty string if undefined
const OTP_TIMEOUT = 300;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

// Configure TOTP options globally
totp.options = {
    step: OTP_TIMEOUT,
    digits: 6, // Default number of digits
};

export const generateTOTP = () => {
    try {
        const token = totp.generate(JWT_SECRET);
        return token;
    } catch (error) {
        console.error("Error generating TOTP:", error);
        throw error;
    }
};

export const verifyOTP = (token: string) => {
    try {
        const isValid = totp.check(token, JWT_SECRET);
        return isValid;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return false;
    }
};
