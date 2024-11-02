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
exports.AxiosService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("../../app-config/app-config.service");
let AxiosService = class AxiosService {
    constructor(httpService, config) {
        this.httpService = httpService;
        this.config = config;
    }
    async get(url, config) {
        return this.httpService.axiosRef
            .get(url, config)
            .then((res) => res.data)
            .catch((err) => {
            throw new Error(err?.message + ': ' + JSON.stringify(err?.response?.data));
        });
    }
    async post(url, data, config) {
        return this.httpService.axiosRef
            .post(url, data, config)
            .then((res) => res.data)
            .catch((err) => {
            throw new Error(err?.message + ': ' + JSON.stringify(err?.response?.data));
        });
    }
    async put(url, data, config) {
        return this.httpService.axiosRef
            .put(url, data, config)
            .then((res) => res.data)
            .catch((err) => {
            throw new Error(err?.message + ': ' + JSON.stringify(err?.response?.data));
        });
    }
    async resolveTokenJWT(accessToken) {
        const { data } = await this.httpService.axiosRef.get(`${this.config.apiComments}${this.config.preFix}/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const { githubUser, username } = data.data;
        return {
            githubUser,
            username
        };
    }
};
exports.AxiosService = AxiosService;
exports.AxiosService = AxiosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        app_config_service_1.AppConfigService])
], AxiosService);
//# sourceMappingURL=axios.service.js.map