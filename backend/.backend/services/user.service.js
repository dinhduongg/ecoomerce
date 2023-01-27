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
exports.UserService = void 0;
const user_entity_1 = require("../entities/user.entity");
const user_mapper_1 = require("./mappers/user.mapper");
const mongodb_1 = require("@mikro-orm/mongodb");
const nestjs_1 = require("@mikro-orm/nestjs");
const lodash_1 = require("lodash");
const bcrypt_1 = require("bcrypt");
const common_1 = require("@nestjs/common");
const dictionary_1 = require("./support/dictionary");
const exceptions_1 = require("@nestjs/common/exceptions");
const enums_1 = require("@nestjs/common/enums");
const core_1 = require("@mikro-orm/core");
let UserService = class UserService {
    constructor(repository, em, mapper, _cache) {
        this.repository = repository;
        this.em = em;
        this.mapper = mapper;
        this._cache = _cache;
    }
    async findAll() {
        try {
            const users = await this.repository.find({});
            return users.map((user) => this.mapper.toDTO(user));
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(username) {
        try {
            const user = await this.repository.findOne({ username: username });
            if (!user)
                throw new exceptions_1.HttpException({ error: { username: `Tài khoản ${username} không tồn tại` } }, enums_1.HttpStatus.UNPROCESSABLE_ENTITY);
            return this.mapper.toDTO(user);
        }
        catch (error) {
            throw error;
        }
    }
    async create(dto) {
        try {
            if (dto.password !== dto.confirmPassword)
                throw new exceptions_1.HttpException({ error: { password: "Mật khẩu không khớp" } }, enums_1.HttpStatus.UNPROCESSABLE_ENTITY);
            const checkUser = await this.repository.findOne({ username: dto.username });
            if (checkUser)
                throw new exceptions_1.HttpException({ error: { username: "Tên đăng nhập đã tồn tại" } }, enums_1.HttpStatus.UNPROCESSABLE_ENTITY);
            const user = this.repository.create((0, lodash_1.cloneDeep)(dictionary_1.generalUserTemplate));
            user.username = dto.username;
            user.password = await (0, bcrypt_1.hash)(dto.password, 10);
            await this.repository.persistAndFlush(user);
            return this.mapper.toDTO(user);
        }
        catch (error) {
            throw error;
        }
    }
    async update(username, dto) {
        try {
            const user = await this.repository.findOne({ username: username });
            if (!user)
                throw new exceptions_1.HttpException(`Không tìm thấy người dùng ${username}`, enums_1.HttpStatus.BAD_REQUEST);
            (0, core_1.wrap)(user).assign(dto);
            await this.repository.flush();
            return user_mapper_1.default.e2d(user);
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(username, action, dto) {
        try {
            const user = await this.repository.findOne({ username });
            if (!user)
                throw new exceptions_1.HttpException(`Không tìm thấy người dùng ${username}`, enums_1.HttpStatus.BAD_REQUEST);
            if (action === 'change') {
                user.password = await (0, bcrypt_1.hash)(dto.password, 10);
            }
            if (action === 'reset') {
                user.password = await (0, bcrypt_1.hash)(user.username, 10);
            }
            await this.repository.persistAndFlush(user);
            return this.mapper.toDTO(user);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(username) {
        try {
            return await this.repository.nativeDelete({ username });
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongodb_1.MongoEntityRepository,
        mongodb_1.EntityManager,
        user_mapper_1.UserMapper, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map