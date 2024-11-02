"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const crypto_1 = require("crypto");
class Comment {
    constructor(comment, id) {
        this._id = id ?? (0, crypto_1.randomUUID)();
        this.comment = {
            ...comment,
            createdAt: comment.createdAt ?? new Date()
        };
    }
    get valuesComment() {
        return this.comment;
    }
    get content() {
        return this.comment.content;
    }
    set content(content) {
        this.comment.content = content;
    }
    get contentValue() {
        return this.comment.content.value;
    }
    get title() {
        return this.comment.title;
    }
    set title(title) {
        this.comment.title = title;
    }
    get titileValue() {
        return this.comment.title.value;
    }
    get propsComment() {
        return this.comment;
    }
    get userId() {
        return this.comment.userId;
    }
    get createdAt() {
        return this.comment.createdAt;
    }
    get updatedAt() {
        return this.comment.updatedAt;
    }
    set updatedAt(updatedAt) {
        this.comment.updatedAt = updatedAt;
    }
    get id() {
        return this._id;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map