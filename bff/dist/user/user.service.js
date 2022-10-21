"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_config_1 = require("./config/user.config");
const config_1 = require("@nestjs/config");
let UserService = UserService_1 = class UserService {
    constructor(userModel, userConfig) {
        this.userModel = userModel;
        this.userConfig = userConfig;
        this.AVATAR_URL = userConfig.avatarUrl;
    }
    async getUsers({ offset, limit }) {
        return this.userModel.find().skip(offset).limit(limit).exec();
    }
    async findOne(id) {
        const user = await this.userModel.findOne({ _id: id }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return user;
    }
    async getUser(id) {
        const user = await this.findOne(id);
        return UserService_1.mapUserToDto(user);
    }
    async create(createUserDto) {
        const user = new this.userModel({
            login: createUserDto.login,
            name: createUserDto.login,
            password: await UserService_1.getHashPassword(createUserDto.password),
            avatar: this.generateAvatar(createUserDto.login),
            requiredTwoFactorAuthentication: false,
        });
        const newUser = await user.save();
        return UserService_1.mapUserToDto(newUser);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return user.remove();
    }
    static async getHashPassword(password) {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }
    generateAvatar(userName) {
        return `${this.AVATAR_URL}?username=${userName}`;
    }
    static mapUserToDto(user) {
        return {
            id: user._id,
            name: user.name,
            login: user.login,
            avatar: user.avatar,
            requiredTwoFactorAuthentication: user.requiredTwoFactorAuthentication,
        };
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, common_1.Inject)(user_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigType !== "undefined" && config_1.ConfigType) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map