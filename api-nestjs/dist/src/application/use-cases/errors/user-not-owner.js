"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotOwner = void 0;
class UserNotOwner extends Error {
    constructor() {
        super('Usuário não é dono desse comentário');
    }
}
exports.UserNotOwner = UserNotOwner;
//# sourceMappingURL=user-not-owner.js.map