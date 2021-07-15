if (!/prod/.test(process.env.NODE_ENV)) {
	require("dotenv/config");
}
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const bodyParser = require("body-parser");
let routers = require("./src/routes");

const app = express();
app.enable("trust proxy");
const { handler } = require('./src/middleware/errorHandler');
// middle wares section
const { CustomLogger } = require("./src/middleware/logger");
let appLogger = new CustomLogger();
//console.log = () => { }
app.use(appLogger.requestDetails(appLogger));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
	console.log('test');
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
});
app.use(require('morgan')('dev', {
	skip: function (req, res) { return res.statusCode < 400; }
}));

routers(app);
app.use(handler);
const opts = {
	explorer: false,
	swaggerOptions: {
		validatorUrl: null
	},
	customSiteTitle: 'cybrilla - Backend REST Service',
	customfavIcon: 'https://www.doodleblue.com/favicon/16x16.png'
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, opts));

app.get('/', (req, res) => {
	res.redirect('/docs');
});

// create the conne/ction to database

const port = process.env.PORT || 2172;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
