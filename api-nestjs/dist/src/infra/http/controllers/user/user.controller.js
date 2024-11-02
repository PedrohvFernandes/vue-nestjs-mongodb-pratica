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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_1 = require("../../../../application/use-cases/user/create-user");
const get_user_1 = require("../../../../application/use-cases/user/get-user");
const create_user_body_1 = require("../../dtos/user/create-user-body");
const get_user_body_1 = require("../../dtos/user/get-user-body");
const get_user_by_name_1 = require("../../../../application/use-cases/user/get-user-by-name");
const update_user_token_1 = require("../../../../application/use-cases/user/update-user-token");
const update_access_token_user_body_1 = require("../../dtos/user/update-access-token-user-body");
const get_access_token_user_1 = require("../../../../application/use-cases/auth/get-access-token-user");
let UserController = class UserController {
    constructor(createUser, getUser, getUserByName, updateUserToken, getAccessTokenUser) {
        this.createUser = createUser;
        this.getUser = getUser;
        this.getUserByName = getUserByName;
        this.updateUserToken = updateUserToken;
        this.getAccessTokenUser = getAccessTokenUser;
    }
    async get(body) {
        const { userId } = body;
        const { user } = await this.getUser.execute({ userId });
        return {
            user
        };
    }
    async getUserByNameParams(githubUser) {
        const { user } = await this.getUserByName.execute({
            githubUser
        });
        return {
            user
        };
    }
    async getAccessToken(githubUser) {
        const { token } = await this.getAccessTokenUser.execute({
            githubUser
        });
        return {
            token
        };
    }
    async create(body) {
        const { githubUser, username, accessToken } = body;
        const { user } = await this.createUser.execute({
            githubUser,
            username,
            accessToken
        });
        return {
            user
        };
    }
    async updateToken(githubUser, body) {
        const { accessToken } = body;
        const { user } = await this.updateUserToken.execute({
            githubUser,
            accessToken
        });
        return {
            user
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_body_1.GetUserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/:githubUser'),
    __param(0, (0, common_1.Param)('githubUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByNameParams", null);
__decorate([
    (0, common_1.Get)('/accesstoken/:githubUser'),
    __param(0, (0, common_1.Param)('githubUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAccessToken", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_body_1.CreateUserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:githubUser'),
    __param(0, (0, common_1.Param)('githubUser')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_access_token_user_body_1.UpdateAccessTokenUserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateToken", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_1.CreateUser,
        get_user_1.GetUser,
        get_user_by_name_1.GetUserByName,
        update_user_token_1.UpdateUserToken,
        get_access_token_user_1.GetAccessTokenUser])
], UserController);
//# sourceMappingURL=user.controller.js.map