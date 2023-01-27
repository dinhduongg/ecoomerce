"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const http_exception_filter_1 = require("./support/http-exception.filter");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const port = process.env.NEST_LISTEN_PORT || '3030';
    const logger = new common_1.Logger('AppModule');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('/api');
    logger.log("\n--------------------------------------------------------------------------------" +
        "\nBACKEND SERVER IS RUNNING AT http://localhost:" + port +
        "\nTIMEZONE is Viet Nam, current Time is " + new Date().toLocaleString() +
        "\n--------------------------------------------------------------------------------");
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.enableCors({
        origin: true,
        credentials: true
    });
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter(httpAdapter));
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb' }));
    app.use(cookieParser());
    await app.listen(Number.parseInt(port));
}
bootstrap();
//# sourceMappingURL=main.js.map