"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require("../../entities/user.entity");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const builder_pattern_1 = require("builder-pattern");
const user_dto_1 = require("../dto/user.dto");
let UserMapper = class UserMapper {
    toDTO(source) {
        return (0, builder_pattern_1.Builder)(user_dto_1.UserDTO)
            .username(source.username)
            .password(source.password)
            .email(source.email)
            .phone(source.phone)
            .fullname(source.fullname)
            .authorities(source.authorities)
            .authority(source.authority)
            .refreshToken(source.refreshToken)
            .addresses(source.addresses)
            .createdAt(source.createdAt)
            .updatedAt(source.updatedAt)
            .build();
    }
    toEntity(source) {
        return (0, builder_pattern_1.Builder)(user_entity_1.User)
            .username(source.username)
            .password(source.password)
            .email(source.email)
            .phone(source.phone)
            .fullname(source.fullname)
            .authorities(source.authorities)
            .authority(source.authority)
            .refreshToken(source.refreshToken)
            .addresses(source.addresses)
            .createdAt(source.createdAt)
            .updatedAt(source.updatedAt)
            .build();
    }
};
UserMapper = __decorate([
    (0, common_1.Injectable)()
], UserMapper);
exports.UserMapper = UserMapper;
const userMapper = {
    d2e: (d) => {
        const _ = (0, builder_pattern_1.Builder)(user_entity_1.User)
            .username(d.username)
            .password((0, bcrypt_1.hashSync)(d.password, 10))
            .email(d.email)
            .phone(d.phone)
            .fullname(d.fullname)
            .authorities(d.authorities)
            .authority(d.authority)
            .refreshToken(d.refreshToken)
            .addresses(d.addresses)
            .createdAt(d.createdAt)
            .updatedAt(d.updatedAt)
            .build();
        return _;
    },
    e2d(source) {
        return (0, builder_pattern_1.Builder)(user_dto_1.UserDTO)
            .username(source.username)
            .email(source.email)
            .phone(source.phone)
            .fullname(source.fullname)
            .authorities(source.authorities)
            .authority(source.authority)
            .refreshToken(source.refreshToken)
            .addresses(source.addresses)
            .createdAt(source.createdAt)
            .updatedAt(source.updatedAt)
            .build();
    }
};
exports.default = userMapper;
//# sourceMappingURL=user.mapper.js.map