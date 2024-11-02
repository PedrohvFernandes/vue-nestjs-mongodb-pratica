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
exports.PrismaCommentRepository = void 0;
const prisma_comment_mapper_1 = require("../mappers/prisma-comment-mapper");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_user_mapper_1 = require("../mappers/prisma-user-mapper");
let PrismaCommentRepository = class PrismaCommentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(comment) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: comment.userId
            }
        });
        if (!user) {
            return;
        }
        const raw = prisma_comment_mapper_1.PrismaCommentMapper.toPrisma(comment);
        const commentCreated = await this.prisma.comment.create({
            data: raw
        });
        if (!commentCreated) {
            return;
        }
        return prisma_comment_mapper_1.PrismaCommentMapper.toDomain(commentCreated);
    }
    async update(comment) {
        const raw = prisma_comment_mapper_1.PrismaCommentMapper.toPrisma(comment);
        const commentUpdated = await this.prisma.comment.update({
            where: {
                id: comment.id
            },
            data: {
                title: raw.title,
                content: raw.content,
                updatedAt: raw.updatedAt
            }
        });
        if (!commentUpdated) {
            return;
        }
        return prisma_comment_mapper_1.PrismaCommentMapper.toDomain(commentUpdated);
    }
    async findById(commentId) {
        const comment = await this.prisma.comment.findUnique({
            where: {
                id: commentId
            }
        });
        if (!comment) {
            return;
        }
        return prisma_comment_mapper_1.PrismaCommentMapper.toDomain(comment);
    }
    async findAll(page, perPage) {
        const total = await this.prisma.comment.count();
        const pages = Math.ceil(total / perPage);
        const offset = (page - 1) * perPage;
        const comments = await this.prisma.comment.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                user: {
                    select: {
                        githubUser: true,
                        username: true,
                        createdAt: true,
                        updatedAt: true,
                        id: true
                    }
                }
            },
            take: perPage,
            skip: offset,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const first = 1;
        const last = pages;
        const prev = page > 1 ? page - 1 : null;
        const next = page < pages ? page + 1 : null;
        return {
            first,
            prev,
            next,
            last,
            pages,
            items: perPage,
            total,
            comments: comments.map((comment) => ({
                comment: prisma_comment_mapper_1.PrismaCommentMapper.toDomain(comment),
                user: prisma_user_mapper_1.PrismaUserMapper.toDomain({
                    id: comment.user.id,
                    githubUser: comment.user.githubUser,
                    username: comment.user.username,
                    createdAt: comment.user.createdAt,
                    updatedAt: comment.user.updatedAt,
                    accessToken: ''
                })
            }))
        };
    }
    async delete(commentId) {
        await this.prisma.comment.delete({
            where: {
                id: commentId
            }
        });
    }
};
exports.PrismaCommentRepository = PrismaCommentRepository;
exports.PrismaCommentRepository = PrismaCommentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCommentRepository);
//# sourceMappingURL=prisma-comment-repository.js.map