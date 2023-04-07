import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "src/utils/constants";

const AppJwtModule = JwtModule.register({
  secret: JWT_SECRET,
  signOptions: { expiresIn: "60m" },
});

export default AppJwtModule;
