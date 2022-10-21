"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPipe = void 0;
const common_1 = require("@nestjs/common");
const userStatuses_1 = require("../const/userStatuses");
let UserPipe = class UserPipe {
    async transform(user) {
        if (user.password !== user.passwordRepeat) {
            throw new common_1.HttpException(userStatuses_1.UserErrors.PASSWORD, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (user.login === user.password) {
            throw new common_1.HttpException(userStatuses_1.UserErrors.LOGIN_AND_PASSWORD, common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
};
UserPipe = __decorate([
    (0, common_1.Injectable)()
], UserPipe);
exports.UserPipe = UserPipe;
//# sourceMappingURL=user.pipe.js.map