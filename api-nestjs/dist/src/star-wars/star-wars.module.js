"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarWarsModule = void 0;
const common_1 = require("@nestjs/common");
const star_wars_controller_1 = require("../infra/http/controllers/star-wars/star-wars.controller");
const app_config_module_1 = require("../app-config/app-config.module");
let StarWarsModule = class StarWarsModule {
};
exports.StarWarsModule = StarWarsModule;
exports.StarWarsModule = StarWarsModule = __decorate([
    (0, common_1.Module)({
        imports: [app_config_module_1.AppConfigModule],
        controllers: [star_wars_controller_1.StarWarsController]
    })
], StarWarsModule);
//# sourceMappingURL=star-wars.module.js.map