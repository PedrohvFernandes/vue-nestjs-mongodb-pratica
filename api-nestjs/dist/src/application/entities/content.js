"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const z = require("zod");
const contentSchema = z.object({
    content: z
        .string()
        .min(1, 'Informe o seu comentário')
        .max(1000, 'Comentário muito longo')
});
class Content {
    get value() {
        return this.content;
    }
    validateContent(content) {
        const validate = contentSchema.safeParse({ content });
        return validate;
    }
    constructor(content) {
        const isContentValid = this.validateContent(content);
        if (isContentValid.error) {
            throw new Error(isContentValid.error.message);
        }
        this.content = content;
    }
}
exports.Content = Content;
//# sourceMappingURL=content.js.map