const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '../public')));

let routePath = path.join(__dirname, '../app/routes');
let files = fs.readdirSync(routePath);

files.map((file) => {
   require(`${routePath}/${file}`)(app);
});

app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(err.statusCode || 500).send({message: err.message});
});

console.log("mode : " + app.get('env'));


module.exports = app;
