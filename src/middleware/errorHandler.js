const { messages, statusCodes } = require('../configs');
const errorCodeHandlers = require("./errorCodesHandler");
const utils = require("./../utils");


function createLogs(req, err) {
	req.appLogger.error(
		`IP - ${req.ip} | URL : ${req.protocol}://${req.get("host")}${req.originalUrl
		} | ${req.method} | Request : ${JSON.stringify(
			req.body ? utils.cleanSensitiveData(req.body) : {}
		)} | Error : ${err.message}`
	);
}




let Err = {
}
// error handler middleware
Err.handler = (err, req, res, next) => {
	//console.log('err', err)
	let transStatus = err.status;
	if (err.error && err.error.details && err.error.isJoi) {
		err.code = statusCodes.HTTP_UNPROCESSABLE_ENTITY;
	}
	console.log(err.code)
	let handler = errorCodeHandlers[err.code];
	console.log('harndler', handler)
	if (handler != undefined) {
		err = handler(err);
	}
	console.log(err.status, err.message);
	createLogs(req, err);
	return res.status(err.status || 500).json({
		status: transStatus || 'Error',
		message: err.message || 'Internal Server Error',
		Error: (err.Error) ? err.Error : undefined
	});
}

Err.errorObjGeneator = (error) => {
	console.log('sdsnf.asndnandndaklnlnddddddd', error.code, error.status);

	let err = new Error();
	err.code = (error.code) ? error.code : statusCodes.HTTP_INTERNAL_SERVER_ERROR;
	err.message = (error.message) ? error.message : messages.technicalErr;
	err.status = (error.status) ? error.status : 'Error'
	
	if (error.original) {
		switch (error.original.code) {
			case 'ER_DUP_ENTRY': err.code = error.original.code;
				err.message = error.original.sqlMessage;
				break;
		}
	}

	err.originalErr = error;
	return err;
}

module.exports = Err;