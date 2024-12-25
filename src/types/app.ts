// auth types

export enum SessionType {
    ACCOUNT = "ACCOUNT",
    RESET_PASSWORD = "RESET_PASSWORD",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
}


export interface AccessTokenType {
    name: string,
    email: string,
    username: string,
    id: string
}

export interface RefreshTokenType {
    userid: string
}

export interface AccountDetailsType {
    name: string,
    email: string,
    username: string,
    password: string
}

export interface OtpSessionType {
    id: string,
    email: string,
    otp: string,
    type: SessionType
}

export interface AuthSessionType {
    id: string,
    email: string,
    type: SessionType
}