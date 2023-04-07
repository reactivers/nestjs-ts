import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { usersRepository } from "src/utils/database";
import { v4 as createUUID } from "uuid";
import {
  SignUpResponseUserDto,
  SignUpUserDto,
  UserDto,
  UserWithPasswordDto,
} from "../../types/user.type";

@Injectable()
export class UserService {
  private checkSignUpParams(user: SignUpUserDto) {
    if (!user.username) throw Error("Username can't be empty");
    // password length and strong test is not implemented
    if (!user.password) throw Error("Password can't be empty");
    if (!user.firstName) throw Error("Firstname can't be empty");
    if (!user.lastName) throw Error("Lastname can't be empty");
    return true;
  }

  async getUserWithPassword(username: string): Promise<UserWithPasswordDto> {
    const user = usersRepository[username];
    if (!user) throw Error("User not found!");
    return { ...user };
  }

  async getUserWithoutPassword(username: string): Promise<UserDto> {
    const user: UserDto = await this.getUserWithPassword(username);
    if (!user) throw Error("User not found!");
    delete (user as never)["password"];
    return user;
  }

  async getUser(username: string): Promise<UserDto> {
    return await this.getUserWithoutPassword(username);
  }

  async createUser(data: SignUpUserDto): Promise<SignUpResponseUserDto> {
    this.checkSignUpParams(data);
    const user = new UserWithPasswordDto();
    user.id = createUUID();
    user.username = data.username;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    const saltOrRounds = 10;
    user.password = await bcrypt.hash(data.password, saltOrRounds);
    usersRepository[data.username] = user;
    return this.getUserWithoutPassword(user.username);
  }
}
