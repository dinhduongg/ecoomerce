"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const common_1 = require("@nestjs/common");
class Controller {
    constructor() {
        this.logger = new common_1.Logger(Controller.name);
    }
    action(id, action, dto, payload, source, ip) { return void 0; }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map