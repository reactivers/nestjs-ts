import { ValidationError, ValidationPipe } from "@nestjs/common";
import { SignInUserDto } from "src/types/user.type";

export class AuthSignupValidationPipe extends ValidationPipe {
  constructor() {
    super();
  }

  override validate(value: SignInUserDto) {
    const { username, password } = value || {};
    const errors = [];

    if (username.length === 0) {
      const error: ValidationError = {
        property: "username",
        constraints: {
          username: "Username is required",
        },
      };
      errors.push(error);
    }
    if (password.length === 0) {
      const error: ValidationError = {
        property: "username",
        constraints: {
          password: "Password is required",
        },
      };
      errors.push(error);
    }
    return errors;
  }
}
