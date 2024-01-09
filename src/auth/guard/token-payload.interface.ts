import { Role } from "@prisma/client";

export interface TokenPayload {
    id: number;
    role: Role;
}