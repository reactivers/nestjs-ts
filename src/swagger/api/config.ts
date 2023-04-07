import { DocumentBuilder } from "@nestjs/swagger";

export const getApiConfig = () =>
  new DocumentBuilder()
    .setTitle("Reaactivers")
    .setDescription("@reactivers/nestjs-ts template")
    .setVersion("1.0.0")
    .addTag("@reactivers")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "JWT",
      },
      "JWT",
    )
    .build();

export default getApiConfig;
