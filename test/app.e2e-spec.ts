import { HttpServer, INestApplication } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { ILoginResponse } from "src/types/auth.type";
import { AppResponse } from "src/types/common.type";
import { SignUpResponseUserDto, UserDto } from "src/types/user.type";
import * as request from "supertest";
import { JwtAuthGuard } from "../src/guards/jwt/jwt-auth.guard";
import { AppModule } from "./../src/app.module";
import { invalidUsers, testUser } from "./mock.user";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let server: HttpServer;
  let user: SignUpResponseUserDto;
  let token = "";

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
    await app.init();
    server = app.getHttpServer();
  });

  describe("When an unauthenticated user", () => {
    describe("Attempt to send requests the protected pages, should return 401", () => {
      it("(GET) /user/profile", () => {
        return request(server).get("/user/profile").expect(401);
      });
    });
    describe("Attempt to signup and signin, should return success", () => {
      it("(POST) /auth/signup", async () => {
        const response = await request(server)
          .post("/auth/signup")
          .send(testUser)
          .expect(201);

        const body: AppResponse<SignUpResponseUserDto> = response.body;
        user = body.data as SignUpResponseUserDto;
        expect(user?.id).toBeDefined();
        expect(user?.username).toBeDefined();
        expect(user?.firstName).toBeDefined();
        expect(user?.lastName).toBeDefined();
      });
      it("(POST) /auth/signin", async () => {
        const response = await request(server)
          .post("/auth/signin")
          .send(testUser)
          .expect(201);
        const body: AppResponse<ILoginResponse> = response.body;
        expect(body.data?.token).toBeDefined();
        if (body.data) token = body.data.token;
      });
    });
    describe("Attempt to signin with the wrong parameters, should return 401", () => {
      it("(POST) /auth/signin", () => {
        return request(server)
          .post("/auth/signin")
          .send(invalidUsers[0])
          .expect(401);
      });
    });
  });
  describe("When an authenticated user", () => {
    describe("Attempt to get the profile, should return the user profile", () => {
      it("(GET) /user/profile", async () => {
        const response = await request(server)
          .get("/user/profile")
          .set("Authorization", `Bearer ${token}`)
          .expect(200);
        const body = response.body as AppResponse<UserDto>;
        const responseUser = body.data;

        expect(responseUser?.id).toEqual(user.id);
        expect(responseUser?.username).toEqual(user.username);
        expect(responseUser?.firstName).toEqual(user.firstName);
        expect(responseUser?.lastName).toEqual(user.lastName);
        // This line is to make sure the password is undefined!
        expect((responseUser as never)["password"]).toBeUndefined();
      });
    });
  });
});
