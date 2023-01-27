"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalUserTemplate = void 0;
const enum_1 = require("../../entities/shared/enum");
const user_entity_1 = require("../../entities/user.entity");
const builder_pattern_1 = require("builder-pattern");
exports.generalUserTemplate = (0, builder_pattern_1.Builder)(user_entity_1.User)
    .username('')
    .password('')
    .email('')
    .phone('')
    .fullname('')
    .authorities([enum_1.AuthorityRole.USER, enum_1.AuthorityRole.ANONYMOUS])
    .authority(enum_1.AuthorityRole.USER)
    .addresses([])
    .refreshToken('')
    .createdAt(new Date())
    .updatedAt(new Date())
    .build();
//# sourceMappingURL=dictionary.js.map