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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const authentication_1 = require("../authentication");
const token_auth_guard_1 = require("../authentication/guards/token-auth.guard");
const enum_1 = require("../entities/shared/enum");
const user_dto_1 = require("../services/dto/user.dto");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(username) {
        return this.userService.findOne(username);
    }
    update(username, dto) {
        return this.userService.update(username, dto);
    }
    resetPassword(username, action, dto) {
        return this.userService.resetPassword(username, action, dto);
    }
    remove(username) {
        return this.userService.remove(username);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, authentication_1.Roles)(enum_1.AuthorityRole.ADMIN, enum_1.AuthorityRole.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':username/password/:action'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Param)('action')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Delete)('delete/:username'),
    (0, authentication_1.Roles)(enum_1.AuthorityRole.ADMIN, enum_1.AuthorityRole.MANAGER),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(token_auth_guard_1.TokenGuard, authentication_1.JwtAuthGuard, authentication_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map