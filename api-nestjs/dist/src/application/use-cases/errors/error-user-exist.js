"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUserExist = void 0;
class ErrorUserExist extends Error {
    constructor() {
        super('Usuário já existe');
    }
}
exports.ErrorUserExist = ErrorUserExist;
//# sourceMappingURL=error-user-exist.js.map