import { Test, TestingModule } from "@nestjs/testing";
import { UserDto } from "src/types/user.type";
import { invalidUsers, testUser } from "test/mock.user";
import { AuthModuleConfig } from "./auth.module";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(
      AuthModuleConfig,
    ).compile();

    authService = app.get<AuthService>(AuthService);
  });

  describe("When the user is valid", () => {
    let validUser: UserDto;
    it("should return the data that sent without password", async () => {
      const response = await authService.signup(testUser);
      expect(response.username).toEqual(testUser.username);
      expect(response.firstName).toEqual(testUser.firstName);
      expect(response.lastName).toEqual(testUser.lastName);
      expect(response.id).toBeDefined();
      validUser = response;
      // This line is to make sure the password is undefined!
      expect((response as never)["password"]).toBeUndefined();
    });
    it("should return the validated user", async () => {
      const response = await authService.validateUser(
        testUser.username,
        testUser.password,
      );
      expect(response.username).toEqual(testUser.username);
      expect(response.firstName).toEqual(testUser.firstName);
      expect(response.lastName).toEqual(testUser.lastName);
      expect(response.id).toBeDefined();
    });
    it("should return token", async () => {
      const token = authService.login(validUser);
      expect(token).toBeDefined();
    });
  });
  describe("When the user is NOT valid", () => {
    it("should throw error for each missing data", async () => {
      const reqWithoutUsername = async () =>
        await authService.signup(invalidUsers[0]);
      const reqWithoutPassword = async () =>
        await authService.signup(invalidUsers[1]);
      const reqWithoutFirstname = async () =>
        await authService.signup(invalidUsers[2]);
      const reqWithoutLastname = async () =>
        await authService.signup(invalidUsers[3]);
      expect(reqWithoutUsername).rejects.toThrowError();
      expect(reqWithoutPassword).rejects.toThrowError();
      expect(reqWithoutFirstname).rejects.toThrowError();
      expect(reqWithoutLastname).rejects.toThrowError();
    });
    it("should return the validated user", async () => {
      const reqWithoutUsername = async () =>
        await authService.validateUser(
          invalidUsers[0].username,
          invalidUsers[0].password,
        );

      const reqWithoutPassword = async () =>
        await authService.validateUser(
          invalidUsers[1].username,
          invalidUsers[1].password,
        );
      expect(reqWithoutUsername).rejects.toThrowError();
      expect(reqWithoutPassword).rejects.toThrowError();
    });
  });
});
