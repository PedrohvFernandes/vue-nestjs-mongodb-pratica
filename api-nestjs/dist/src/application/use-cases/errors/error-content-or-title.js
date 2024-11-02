"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorContentOrTitle = void 0;
class ErrorContentOrTitle extends Error {
    constructor(message = 'Você deve informar o título ou o conteúdo do comentário') {
        super(message);
    }
}
exports.ErrorContentOrTitle = ErrorContentOrTitle;
//# sourceMappingURL=error-content-or-title.js.map