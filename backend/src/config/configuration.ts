import { Configuration } from "@/entities/shared/configuration.interface"
import { Builder } from "builder-pattern"

export default () =>
    Builder<Configuration.Configure>()
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
        .build()
