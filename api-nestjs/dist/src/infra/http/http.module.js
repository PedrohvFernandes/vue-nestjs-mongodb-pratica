"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const create_comment_1 = require("../../application/use-cases/comment/create-comment");
const get_all_comments_1 = require("../../application/use-cases/comment/get-all-comments");
const update_comment_1 = require("../../application/use-cases/comment/update-comment");
const create_user_1 = require("../../application/use-cases/user/create-user");
const get_user_1 = require("../../application/use-cases/user/get-user");
const comment_controller_1 = require("./controllers/comment/comment.controller");
const delete_comment_1 = require("../../application/use-cases/comment/delete-comment");
const user_controller_1 = require("./controllers/user/user.controller");
const auth_module_1 = require("../auth/auth.module");
const get_user_by_name_1 = require("../../application/use-cases/user/get-user-by-name");
const update_user_token_1 = require("../../application/use-cases/user/update-user-token");
const get_access_token_user_1 = require("../../application/use-cases/auth/get-access-token-user");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule],
        controllers: [comment_controller_1.CommentController, user_controller_1.UserController],
        providers: [
            create_comment_1.CreateComment,
            get_all_comments_1.GetAllComments,
            update_comment_1.UpdateComment,
            create_user_1.CreateUser,
            delete_comment_1.DeleteComment,
            get_user_1.GetUser,
            get_user_by_name_1.GetUserByName,
            update_user_token_1.UpdateUserToken,
            get_access_token_user_1.GetAccessTokenUser
        ]
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map