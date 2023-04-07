import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import initGuards from "./guards";
import setupSwagger from "./swagger";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    initGuards(app);
    setupSwagger(app);
    await app.listen(3000);
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
}

bootstrap();
