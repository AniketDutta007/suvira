import { DefaultUser } from "next-auth";
import { $Enums } from "@prisma/client";

declare module "next-auth" {
    interface User extends DefaultUser {
        role: $Enums.Role;
    }
    interface Session {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: $Enums.Role;
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser extends BaseAdapterUser {
        role: $Enums.Role;
    }
}