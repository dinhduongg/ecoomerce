"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_pattern_1 = require("builder-pattern");
exports.default = () => (0, builder_pattern_1.Builder)()
    .database({
    mongoUrl: process.env.MONGO_URL,
    mongoDbs: process.env.MONGO_DBS || "fashion",
})
    .security({
    authentication: {
        jwt: {
            secret: process.env.JWT_SECRET_KEY,
            access: process.env.JWT_ACCESS_KEY,
            refresh: process.env.JWT_REFRESH_KEY
        },
    }
})
    .build();
//# sourceMappingURL=configuration.js.map