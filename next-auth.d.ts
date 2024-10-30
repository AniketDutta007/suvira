// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession, User } from "next-auth";
import { $Enums } from "@prisma/client";

declare module "next-auth" {
    interface User {
        role: $Enums.Role;
    }
}