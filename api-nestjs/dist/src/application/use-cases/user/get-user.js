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
exports.GetUser = void 0;
const users_repository_1 = require("../../repositories/users-repository");
const user_not_found_1 = require("../errors/user-not-found");
const common_1 = require("@nestjs/common");
let GetUser = class GetUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request) {
        const user = await this.userRepository.findById(request.userId);
        if (!user) {
            throw new common_1.NotFoundException(new user_not_found_1.UserNotFound().message);
        }
        return { user };
    }
};
exports.GetUser = GetUser;
exports.GetUser = GetUser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], GetUser);
//# sourceMappingURL=get-user.js.map