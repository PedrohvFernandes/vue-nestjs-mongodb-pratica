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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const app_config_service_1 = require("../../app-config/app-config.service");
const axios_service_1 = require("../axios/axios.service");
let AuthService = class AuthService {
    constructor(jwtService, config, axiosService) {
        this.jwtService = jwtService;
        this.config = config;
        this.axiosService = axiosService;
    }
    async validateToken(githubUser) {
        try {
            const tokenResponse = await this.axiosService.get(`${this.config.apiComments}${this.config.preFix}/users/accesstoken/${githubUser}`);
            if (tokenResponse.data && tokenResponse.data.token.accessToken) {
                try {
                    this.jwtService.verify(tokenResponse.data.token.accessToken, {
                        secret: this.config.jwtSecret,
                        maxAge: '10h'
                    });
                    const { githubUser, username } = await this.axiosService.resolveTokenJWT(tokenResponse.data.token.accessToken);
                    return {
                        githubUser,
                        username,
                        accessToken: tokenResponse.data.token.accessToken,
                        userId: tokenResponse.data.token.userId
                    };
                }
                catch (error) {
                    error.message = 'Token expirado ou inválido. Gerando um novo token.';
                    console.error(error);
                    return {
                        githubUser: null,
                        username: null,
                        userId: tokenResponse.data.token.userId,
                        accessToken: tokenResponse.data.token.accessToken
                    };
                }
            }
        }
        catch (error) {
            error.message = 'Usuário não encontrado. Gerando um novo token.';
            console.error(error);
            return {
                githubUser: null,
                username: null,
                userId: null,
                accessToken: null
            };
        }
    }
    async generateOrUpdateToken(user, existingUser) {
        const payload = { githubUser: user.username, username: user.displayName };
        const accessToken = this.jwtService.sign(payload);
        const { githubUser, username } = await this.axiosService.resolveTokenJWT(accessToken);
        if (existingUser && existingUser.existingToken) {
            await this.axiosService.put(`${this.config.apiComments}${this.config.preFix}/users/${githubUser}`, {
                accessToken
            });
            return { githubUser, username, accessToken, userId: existingUser.userId };
        }
        if (!existingUser.existingToken) {
            const userCreated = await this.axiosService.post(`${this.config.apiComments}${this.config.preFix}/users`, {
                githubUser,
                username,
                accessToken
            });
            return { githubUser, username, accessToken, userId: userCreated.data.id };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        app_config_service_1.AppConfigService,
        axios_service_1.AxiosService])
], AuthService);
//# sourceMappingURL=auth.service.js.map