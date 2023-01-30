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
const user_entity_1 = require("../entities/user.entity");
const mongodb_1 = require("@mikro-orm/mongodb");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("./user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, config, em) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.config = config;
        this.em = em;
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
            const payload = {
                username: user.username,
                authorities: user.authorities,
                authority: user.authority
            };
            const currentUser = await this.em.findOne(user_entity_1.User, { username: user.username });
            const accessToken = await this.generateAccessToken(payload);
            if (currentUser.refreshToken) {
                res.cookie('jwt', { refreshToken: currentUser.refreshToken }, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
            }
            else {
                const refreshToken = await this.generateRefreshToken(payload);
                currentUser.refreshToken = refreshToken;
                res.cookie('jwt', { refreshToken: refreshToken }, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                await this.em.persistAndFlush(currentUser);
            }
            return { accessToken };
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
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            throw new common_1.HttpException('Đăng xuất', common_1.HttpStatus.NO_CONTENT);
        }
        catch (error) {
            throw error;
        }
    }
    async generateAccessToken(dto) {
        try {
            const accessToken = await this.jwtService.signAsync(dto, {
                secret: this.config.get('security.authentication.jwt.access'),
                expiresIn: '15s',
            });
            return accessToken;
        }
        catch (error) {
            throw error;
        }
    }
    async generateRefreshToken(dto) {
        try {
            const refreshToken = await this.jwtService.signAsync(dto, {
                secret: this.config.get('security.authentication.jwt.refresh'),
                expiresIn: '7d',
            });
            return refreshToken;
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mongodb_1.EntityManager])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map