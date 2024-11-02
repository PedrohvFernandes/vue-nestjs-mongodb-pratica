"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserViewModel = void 0;
class UserViewModel {
    static toHTTP(user) {
        return {
            id: user.id,
            username: user.username,
            githubUser: user.githubUser
        };
    }
}
exports.UserViewModel = UserViewModel;
//# sourceMappingURL=user-view-models.js.map