import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import getApiDocument from "./api";

const setupSwagger = (app: INestApplication) => {
  const apiDocument = getApiDocument(app);
  SwaggerModule.setup("api", app, apiDocument);
};

export default setupSwagger;
