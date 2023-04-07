import { Test, TestingModule } from "@nestjs/testing";
import { SignUpResponseUserDto } from "src/types/user.type";
import { invalidUsers, testUser } from "../../../test/mock.user";
import { UserService } from "./user.service";

describe("UserService", () => {
  let userService: UserService;
  let user: SignUpResponseUserDto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [UserService],
      exports: [],
    }).compile();
    userService = app.get<UserService>(UserService);
  });

  describe("When the user is valid", () => {
    it("should create the user and return the data that sent", async () => {
      const response = await userService.createUser(testUser);
      expect(response.username).toEqual(testUser.username);
      expect(response.firstName).toEqual(testUser.firstName);
      expect(response.lastName).toEqual(testUser.lastName);
      expect(response.id).toBeDefined();
      user = response;
    });
    it("should return the user that has signed up", async () => {
      const response = await userService.getUser(user.username);
      expect(response.username).toEqual(testUser.username);
      expect(response.firstName).toEqual(testUser.firstName);
      expect(response.lastName).toEqual(testUser.lastName);
      expect(response.id).toBeDefined();
    });
  });
  describe("When the user is NOT valid", () => {
    it("should not create the user and should throw error", async () => {
      const reqWithoutUsername = async () =>
        await userService.createUser(invalidUsers[0]);
      const reqWithoutPassword = async () =>
        await userService.createUser(invalidUsers[1]);
      const reqWithoutFirstname = async () =>
        await userService.createUser(invalidUsers[2]);
      const reqWithoutLastname = async () =>
        await userService.createUser(invalidUsers[3]);
      expect(reqWithoutUsername).rejects.toThrowError();
      expect(reqWithoutPassword).rejects.toThrowError();
      expect(reqWithoutFirstname).rejects.toThrowError();
      expect(reqWithoutLastname).rejects.toThrowError();
    });
    it("should not return the user and should throw error", async () => {
      const reqWithoutUsername = async () => await userService.getUser("");
      expect(reqWithoutUsername).rejects.toThrowError();
    });
    it("should not return any user data and should throw error", async () => {
      const reqWithoutUsername = async () =>
        await userService.getUserWithoutPassword("");
      expect(reqWithoutUsername).rejects.toThrowError();
    });
  });
});
