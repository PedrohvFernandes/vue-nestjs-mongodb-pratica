"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserMapper = void 0;
const user_1 = require("../../../../application/entities/user");
class PrismaUserMapper {
    static toPrisma(user) {
        return {
            githubUser: user.githubUser,
            username: user.username,
            accessToken: user.accessToken,
            updatedAt: user.updatedAtUser
        };
    }
    static toDomain(raw) {
        const user = new user_1.User({
            githubUser: raw.githubUser,
            username: raw.username
        }, raw.id, raw.createdAt, raw.updatedAt);
        return user;
    }
    static toDomainAccessToken(raw) {
        return {
            accessToken: raw.accessToken,
            userId: raw.id
        };
    }
}
exports.PrismaUserMapper = PrismaUserMapper;
//# sourceMappingURL=prisma-user-mapper.js.map