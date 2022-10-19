"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    const url = await app.getUrl();
    console.log(`Started on ${url}`);
}
bootstrap();
//# sourceMappingURL=main.js.map