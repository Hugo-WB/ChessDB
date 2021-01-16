let getPgSessionConfig = (session) => {
    const conObject = {
        user: "ChessDB",
        password: "ChessDBQL",
        host: "localhost",
        port: 5432,
        database: "ChessDB",
    };
    const pgSession = require("connect-pg-simple")(session);
    const pgStoreConfig = {
        conObject: conObject,
    };
    return pgStoreConfig;
};
//# sourceMappingURL=pg-session-config.js.map