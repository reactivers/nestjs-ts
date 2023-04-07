import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export declare type AuthenticatedRequest = ParameterDecorator & {
  user: UserDto;
};

export class UserWithPasswordDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Username is required",
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Password is required",
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Firstname is required",
  })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Lastname is required",
  })
  lastName: string;
}

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Username is required",
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Firstname is required",
  })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Lastname is required",
  })
  lastName: string;
}

export class SignUpUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Username is required",
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Password is required",
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Firstname is required",
  })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Lastname is required",
  })
  lastName: string;
}

export class SignUpResponseUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Username is required",
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Firstname is required",
  })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Lastname is required",
  })
  lastName: string;
}

export class SignInUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Username is required",
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Password is required",
  })
  password: string;
}
