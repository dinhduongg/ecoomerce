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
            secret: process.env.JWT_SECRET_KEY || 'NDhjNjk1NTM3NWRlNjc1NDMwZjllNWFiMmVlYjQ4NzViYzY4MmY5ZWY2MzZhMzNiMTYxYmNlYjJkMWYwNDk0NDBlNDYwZThjMmFmNzAyNTQyOWYxMDhkM2QxYTQ3ZDFjM2I5YWU4YWVjOGRhNDc3MWE5OTExMzUyMjI3MDlmZWM=',
        }
    }
})
    .build();
//# sourceMappingURL=configuration.js.map