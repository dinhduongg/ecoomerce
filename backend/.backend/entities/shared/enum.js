"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = exports.cartType = exports.AuthorityRole = void 0;
var AuthorityRole;
(function (AuthorityRole) {
    AuthorityRole["ANONYMOUS"] = "ANONYMOUS";
    AuthorityRole["USER"] = "USER";
    AuthorityRole["MANAGER"] = "MANAGER";
    AuthorityRole["ADMIN"] = "ADMIN";
})(AuthorityRole = exports.AuthorityRole || (exports.AuthorityRole = {}));
var cartType;
(function (cartType) {
    cartType["increase"] = "increase";
    cartType["decrease"] = "decrease";
})(cartType = exports.cartType || (exports.cartType = {}));
var Actions;
(function (Actions) {
    Actions["POPULAR"] = "popular";
    Actions["SALE"] = "sale";
    Actions["NEW"] = "new";
    Actions["SOLDCOUNT"] = "soldcount";
    Actions["SIMILAR"] = "similar";
})(Actions = exports.Actions || (exports.Actions = {}));
//# sourceMappingURL=enum.js.map