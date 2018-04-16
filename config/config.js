module.exports = {
    port: process.env.PORT || 8080,
    db: {
        name: 'test',
        username: null,
        password: null
    },
    session: {
        secretKey: 'thisIsSecretKey'
    }
};
