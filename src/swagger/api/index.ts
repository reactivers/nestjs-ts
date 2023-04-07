import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import getApiConfig from "./config";

const getApiDocument = (app: INestApplication) => {
  const apiConfig = getApiConfig();
  const apiDocument = SwaggerModule.createDocument(app, apiConfig);
  return apiDocument;
};

export default getApiDocument;
