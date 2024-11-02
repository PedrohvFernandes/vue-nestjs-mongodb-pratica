"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const app_config_service_1 = require("./app-config/app-config.service");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const configService = new app_config_service_1.AppConfigService(config);
    app.setGlobalPrefix(configService.preFix);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.enableCors({
        origin: configService.frontComments,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    });
    await app.listen(configService.portApi);
    console.log(`This application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map