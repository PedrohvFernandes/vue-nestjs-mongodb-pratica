"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("./app-config.service");
const joi = require("joi");
const config_1 = require("@nestjs/config");
let AppConfigModule = class AppConfigModule {
};
exports.AppConfigModule = AppConfigModule;
exports.AppConfigModule = AppConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi.object({
                    STAR_WARS_API_URL: joi.string().required(),
                    PORT: joi.number().default(3333),
                    GITHUB_CLIENT_ID: joi.string().required(),
                    GITHUB_CLIENT_SECRET: joi.string().required(),
                    JWT_SECRET: joi.string().required(),
                    API_COMMENTS: joi.string().required(),
                    PRE_FIX: joi.string().required()
                })
            })
        ],
        providers: [app_config_service_1.AppConfigService],
        exports: [app_config_service_1.AppConfigService]
    })
], AppConfigModule);
//# sourceMappingURL=app-config.module.js.map