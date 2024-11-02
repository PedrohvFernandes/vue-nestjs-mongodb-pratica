"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const z = require("zod");
const titleSchema = z.object({
    title: z
        .string()
        .min(5, 'Informe o título do comentário')
        .max(20, 'Título muito longo')
});
class Title {
    get value() {
        return this.title;
    }
    validateTitle(title) {
        const validate = titleSchema.safeParse({ title });
        return validate;
    }
    constructor(title) {
        const isTitleValid = this.validateTitle(title);
        if (isTitleValid.error) {
            throw new Error(isTitleValid.error.message);
        }
        this.title = title;
    }
}
exports.Title = Title;
//# sourceMappingURL=title.js.map