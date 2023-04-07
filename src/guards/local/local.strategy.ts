import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserDto } from "src/types/user.type";
import { AuthService } from "../../modules/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<UserDto | HttpException> {
    try {
      return await this.authService.validateUser(username, password);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
