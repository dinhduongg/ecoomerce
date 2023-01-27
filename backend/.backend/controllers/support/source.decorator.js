"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
const common_1 = require("@nestjs/common");
exports.Source = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['source'];
});
//# sourceMappingURL=source.decorator.js.map