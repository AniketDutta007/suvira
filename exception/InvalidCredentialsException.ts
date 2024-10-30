import { CredentialsSignin } from "next-auth";

class InvalidCredentialsException extends CredentialsSignin {
    code = "Invalid Credentials";
    message = "Invalid credentials provided";
}

export default InvalidCredentialsException;