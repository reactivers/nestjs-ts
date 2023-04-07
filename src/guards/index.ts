import { INestApplication } from "@nestjs/common";
import getJWTGuard from "./jwt";

const initGuards = (app: INestApplication) => {
  const jwtGuard = getJWTGuard();
  app.useGlobalGuards(jwtGuard);
};

export default initGuards;
