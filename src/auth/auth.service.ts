import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUp } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ){}

  public async register(signup: SignUp): Promise<any>{
      const user = await this.userService.create(signup)

      return user;
  }

  public async login(email: string, password: string): Promise<User>{
    let user: User;
    try{
      user = await this.userService.findOne({where: {email}});
    }catch(error){
      throw new UnauthorizedException(`User doesn't exist with ${email}`);
    }

    if(!await user.checkPassword(password)){
      throw new UnauthorizedException(`Wrong password for user with email : ${email}`);
    }

    return user;
  }

  public  signToken(user: User): string {
    const payload = {
      sub: user.email,
    }

    return this.jwtService.sign(payload);
  }

  public async verifyPayload(payload: JwtPayload): Promise<User>{
    let user: User;
    try{
      user = await this.userService.findOne({where:{email: payload.sub}})
    }catch(error){
      throw new UnauthorizedException(`There is not any user with email : ${payload.sub}`);
    }
    return user
  }
}
