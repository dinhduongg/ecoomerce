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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("./user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.userService.findOne(username);
        const match = await (0, bcrypt_1.compare)(password, user.password);
        if (!match)
            throw new common_1.HttpException({ error: { password: "Mật khẩu không chính xác" } }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        if (user && match) {
            const { password, createdAt, updatedAt } = user, result = __rest(user, ["password", "createdAt", "updatedAt"]);
            return result;
        }
        return null;
    }
    async login(user, res) {
        try {
            const accessToken = this.jwtService.sign(user);
            res.cookie('jwt', { accessToken, username: user.username, fullname: user.fullname, roles: user.authorities }, {
                httpOnly: false,
                secure: true,
                path: "/",
                sameSite: "none",
            });
            return { accessToken, username: user.username, authorities: user.authorities, fullname: user.fullname };
        }
        catch (error) {
            throw error;
        }
    }
    async register(dto) {
        await this.userService.create(dto);
    }
    async logout(request, response) {
        try {
            const { jwt } = request.cookies;
            if (!jwt)
                throw new common_1.HttpException('no token', common_1.HttpStatus.NO_CONTENT);
            response.clearCookie("jwt", {
                httpOnly: false,
                secure: true,
                path: "/",
                sameSite: "none",
            });
            throw new common_1.HttpException('Đăng xuất', common_1.HttpStatus.NO_CONTENT);
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map