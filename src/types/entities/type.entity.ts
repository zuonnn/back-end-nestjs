import { IsNotEmpty, IsString } from "class-validator";

export class Type {
    @IsNotEmpty()
    @IsString()
    name: string;
}
