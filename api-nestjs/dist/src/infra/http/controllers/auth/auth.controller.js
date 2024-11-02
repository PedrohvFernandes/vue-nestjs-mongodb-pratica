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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("../../../auth/auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async authCallback(req) {
        const user = req.user;
        const existingUser = await this.authService.validateToken(user.username);
        if (existingUser.githubUser) {
            return {
                githubUser: existingUser.githubUser,
                username: existingUser.username,
                userId: existingUser.userId
            };
        }
        const newUser = await this.authService.generateOrUpdateToken(user, {
            existingToken: existingUser.accessToken,
            userId: existingUser.userId
        });
        return {
            githubUser: newUser.githubUser,
            username: newUser.username,
            userId: newUser.userId
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map