export namespace Configuration {

    export interface Database {
        mongoUrl: string
        mongoDbs: string
    }

    export interface Security {
        authentication: {
            jwt: {
                secret: string
            }
        }
    }

    export interface Configure {
        database: Configuration.Database,
        security: Configuration.Security,
    }

}