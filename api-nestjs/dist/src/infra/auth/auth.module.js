"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const app_config_module_1 = require("../../app-config/app-config.module");
const auth_strategy_1 = require("./auth.strategy");
const auth_controller_1 = require("../http/controllers/auth/auth.controller");
const axios_module_1 = require("../axios/axios.module");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_strategy_1.GithubStrategy, auth_strategy_1.JwtStrategy, auth_service_1.AuthService],
        imports: [
            app_config_module_1.AppConfigModule,
            axios_module_1.AxiosModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => {
                    return {
                        signOptions: { expiresIn: '10h' },
                        secret: configService.get('JWT_SECRET')
                    };
                },
                inject: [config_1.ConfigService]
            })
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map