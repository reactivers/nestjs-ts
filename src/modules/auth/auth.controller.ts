import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { LocalAuthGuard } from "src/guards/local/local-auth.guard";
import { Public } from "src/guards/public/public.guard";
import { ILoginResponse } from "src/types/auth.type";
import { AppResponse } from "src/types/common.type";
import {
  AuthenticatedRequest,
  SignInUserDto,
  SignUpResponseUserDto,
  SignUpUserDto,
} from "src/types/user.type";
import { AuthSignupValidationPipe } from "src/validations/auth/signup";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  @Public()
  signin(
    @Request() req: AuthenticatedRequest,
    // The next line is for SwaggerUI
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _: SignInUserDto,
  ): AppResponse<ILoginResponse> {
    try {
      const token = this.authService.login(req.user);
      return {
        data: { token },
      };
    } catch (error) {
      console.log("error", error);
      throw new BadRequestException(error.message);
    }
  }

  @UsePipes(AuthSignupValidationPipe)
  @Public()
  @Post("signup")
  async signup(
    @Body() user: SignUpUserDto,
  ): Promise<AppResponse<SignUpResponseUserDto>> {
    try {
      const savedUser = await this.authService.signup(user);
      return {
        data: savedUser,
      };
    } catch (error) {
      console.log("error", error.message);
      throw new BadRequestException(error.message);
    }
  }
}
