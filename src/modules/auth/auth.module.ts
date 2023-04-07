import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/guards/jwt/jwt.strategy";
import { LocalStrategy } from "../../guards/local/local.strategy";
import AppJwtModule from "../jwt/jwt.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const AuthModuleConfig = {
  imports: [UserModule, PassportModule, AppJwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
};

@Module(AuthModuleConfig)
export class AuthModule {}
