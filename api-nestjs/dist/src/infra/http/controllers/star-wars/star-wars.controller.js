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
exports.StarWarsController = void 0;
const app_config_service_1 = require("../../../../app-config/app-config.service");
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let StarWarsController = class StarWarsController {
    constructor(config) {
        this.apiBaseUrl = config.starWarsApiUrl;
    }
    getCharacters() {
        return axios_1.default.get(`${this.apiBaseUrl}/people`).then((response) => {
            return response.data;
        });
    }
};
exports.StarWarsController = StarWarsController;
__decorate([
    (0, common_1.Get)('characters'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StarWarsController.prototype, "getCharacters", null);
exports.StarWarsController = StarWarsController = __decorate([
    (0, common_1.Controller)('star-wars'),
    __metadata("design:paramtypes", [app_config_service_1.AppConfigService])
], StarWarsController);
//# sourceMappingURL=star-wars.controller.js.map