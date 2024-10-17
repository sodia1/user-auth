import { IsDefined, IsEAN, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUp{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsDefined()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}