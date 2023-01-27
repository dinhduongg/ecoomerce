export declare namespace Configuration {
    interface Database {
        mongoUrl: string;
        mongoDbs: string;
    }
    interface Security {
        authentication: {
            jwt: {
                secret: string;
                access: string;
                refresh: string;
            };
        };
    }
    interface Configure {
        database: Configuration.Database;
        security: Configuration.Security;
    }
}
