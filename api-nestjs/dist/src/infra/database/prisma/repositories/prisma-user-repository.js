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
exports.PrismaUserRepository = void 0;
const prisma_service_1 = require("../prisma.service");
const prisma_user_mapper_1 = require("../mappers/prisma-user-mapper");
const common_1 = require("@nestjs/common");
let PrismaUserRepository = class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        const userExist = await this.prisma.user.findFirst({
            where: {
                username: user.username
            }
        });
        if (userExist) {
            return;
        }
        const raw = prisma_user_mapper_1.PrismaUserMapper.toPrisma(user);
        const userCreate = await this.prisma.user.create({
            data: raw
        });
        return prisma_user_mapper_1.PrismaUserMapper.toDomain(userCreate);
    }
    async findById(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return;
        }
        return prisma_user_mapper_1.PrismaUserMapper.toDomain(user);
    }
    async findByGithubUser(githubUser) {
        const user = await this.prisma.user.findFirst({
            where: {
                githubUser
            }
        });
        if (!user) {
            return;
        }
        return prisma_user_mapper_1.PrismaUserMapper.toDomain(user);
    }
    async updateToken(user) {
        const raw = prisma_user_mapper_1.PrismaUserMapper.toPrisma(user);
        const userUpdated = await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                accessToken: raw.accessToken,
                updatedAt: raw.updatedAt
            }
        });
        return prisma_user_mapper_1.PrismaUserMapper.toDomain(userUpdated);
    }
    async tokenIsValid(githubUser) {
        const user = await this.prisma.user.findFirst({
            where: {
                githubUser
            }
        });
        if (!user.accessToken) {
            return;
        }
        return prisma_user_mapper_1.PrismaUserMapper.toDomainAccessToken(user);
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user-repository.js.map