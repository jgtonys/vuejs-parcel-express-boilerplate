let express = require('./config/express');
let config = require('./config/config');
let db = require('./config/db');
db.sequelize.sync({force: true}).then(r => console.log(r)).catch(e => console.log(e));

express.listen(config.port, () => {
    console.log(`Express server has started on port ${config.port}`);
});
