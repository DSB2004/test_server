# Login Microservice

This microservice provides functionality for user login using a username and password.

## Purpose
The login service authenticates users by validating their credentials, checking them against the database, and issuing JWT tokens for access and refresh purposes.

---

## Endpoint
### POST `/auth/login`

Authenticates a user and returns an access token and a refresh token.

### Request
**Headers**:  
No special headers required.

**Body** (JSON):
```json
{
  "username": "string",
  "password": "string"
}
```

# SignUp Microservice

This microservice handles user signup by validating the user input, hashing passwords, and generating an OTP for email verification.

---

## Endpoint
### POST `/auth/signup`

Initiates the signup process by validating user input, storing user data temporarily in Redis, and sending a one-time password (OTP) for email verification.

---

### Request
**Body**:
- **name** (string): Full name of the user.
- **email** (string): Email address of the user.
- **password** (string): Password for the account.
- **confirmPassword** (string): Confirm Password for the account.
- **username** (string): Desired username.

Example:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123", 
  // must be of atleast 8 character, must contain one special character and one number
  "confirmPassword":"securepassword123",
  // password === confirmPassword
  "username": "johndoe"
}
```


# OTP Verification Microservice

This microservice handles OTP verification and generates an authorization session upon successful OTP validation.

---

## Endpoint
### POST `/auth/otp`

Validates a one-time password (OTP) and creates an authorization session if the OTP is valid.

---

### Request
**Headers**:
- **otp-session** (string): The OTP session ID, obtained during the signup process.

**Body**:
- **otp** (string): The one-time password entered by the user.

Example:
```json
{
  "otp": "123456"
}
```

# Create Account Microservice

This microservice handles the creation of user accounts by validating session data, retrieving user details, and storing the new user in the database.

---

## Endpoint
### POST `/auth/account`

Creates a new user account using the information stored in Redis and issues JWT tokens.

---

### Request
**Headers**:
- **auth-session**: A valid session token to authenticate the account creation process via OTP verification. 

**Body**:  
No body parameters required. User data is retrieved from Redis.

---

### Response
#### Success (201 Created):
```json
{
  "msg": "Account created successfully",
  "accessToken": "string",
  "refreshToken": "string"
}
```
# Forget Password Microservice

This microservice handles the initial step of resetting a password. It generates a one-time password (OTP) for users who request a password reset.

---

## Endpoint
### POST `/auth/forget-password`

Generates a one-time password (OTP) and initiates an OTP session for password reset.

---

### Request
**Body**:
- **email** (string): The email address associated with the user's account.

Example:
```json
{
  "email": "user@example.com"
}
```

# Reset Password Microservice

This microservice handles resetting the user's password. It verifies the user's session and updates their password in the database.

---

## Endpoint
### POST `/auth/reset-password`

Updates the user's password after verifying the session and validating via OTP.

---

### Request
**Headers**:
- **auth-session** (string): The session token generated after OTP verification.

**Body**:
- **password** (string): The new password.
- **confirmPassword** (string): Confirm password

Example:
```json
{
  "password": "new_secure_password123",
  "confirmPassword": "new_secure_password123"
}
```


# For Reference


## For Login
```json
{
  "username":"admin",
  "password": "1234567890@"
}
```


