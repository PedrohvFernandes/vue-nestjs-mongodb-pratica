"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
const z = require("zod");
const userSchema = z.object({
    username: z.string().trim().min(5).max(255),
    githubUser: z.string().trim().min(5).max(255),
    accessToken: z.string().optional()
});
class User {
    get valuesUser() {
        return this.user;
    }
    validateUser(user) {
        const validate = userSchema.safeParse(user);
        return validate;
    }
    constructor(user, id, createdAt, updatedAt) {
        const isUserValid = this.validateUser(user);
        if (isUserValid.error) {
            throw new Error(isUserValid.error.message);
        }
        this._id = id ?? (0, crypto_1.randomUUID)();
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? null;
        this.user = user;
    }
    get id() {
        return this._id;
    }
    get createdAtUser() {
        return this.createdAt;
    }
    get updatedAtUser() {
        return this.updatedAt;
    }
    set updatedAtUser(updatedAt) {
        this.updatedAt = updatedAt;
    }
    get accessToken() {
        return this.user.accessToken;
    }
    get username() {
        return this.user.username;
    }
    get githubUser() {
        return this.user.githubUser;
    }
    set username(username) {
        this.user.username = username;
    }
    set githubUser(githubUser) {
        this.user.githubUser = githubUser;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map