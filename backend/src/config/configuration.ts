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
                    secret: process.env.JWT_SECRET_KEY || 'NDhjNjk1NTM3NWRlNjc1NDMwZjllNWFiMmVlYjQ4NzViYzY4MmY5ZWY2MzZhMzNiMTYxYmNlYjJkMWYwNDk0NDBlNDYwZThjMmFmNzAyNTQyOWYxMDhkM2QxYTQ3ZDFjM2I5YWU4YWVjOGRhNDc3MWE5OTExMzUyMjI3MDlmZWM=',
                }
            }
        })
        .build()
