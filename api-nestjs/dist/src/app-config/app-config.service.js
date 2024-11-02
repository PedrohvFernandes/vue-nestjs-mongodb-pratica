"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = class AppConfigService {
    constructor(config) {
        this.config = config;
    }
    get starWarsApiUrl() {
        return this.config.get('STAR_WARS_API_URL');
    }
    get portApi() {
        return this.config.get('PORT');
    }
    get githubClientId() {
        return this.config.get('GITHUB_CLIENT_ID');
    }
    get githubClientSecret() {
        return this.config.get('GITHUB_CLIENT_SECRET');
    }
    get jwtSecret() {
        return this.config.get('JWT_SECRET');
    }
    get apiComments() {
        return this.config.get('API_COMMENTS');
    }
    get frontComments() {
        return this.config.get('FRONT_COMMENTS');
    }
    get preFix() {
        return this.config.get('PRE_FIX');
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfigService);
//# sourceMappingURL=app-config.service.js.map