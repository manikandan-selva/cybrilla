const jwt = require("jsonwebtoken");
const { statusCodes, messages, config } = require("../configs");

let verifyToken = async (req, res, next) => {
	console.log('in verify token');
	let token = req.headers["x-access-token"] || req.headers["authorization"];
	if (token) {
		token = token.replace("Bearer ", "");
		console.log(token)
		if (token == process.env.notificationSecret) {
			next();
		} else {
			return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
				if (err) {
					console.log('error', err);
					next({
						code: statusCodes.HTTP_UNAUTHORIZED,
						message: messages[statusCodes.HTTP_UNAUTHORIZED],
					});
				} else {
					req.user = {};
					req.user = payload; // payload
					next();
				}
			});
		}

	} else {
		;
		next({
			code: statusCodes.HTTP_UNAUTHORIZED,
			message: messages[statusCodes.HTTP_UNAUTHORIZED],
		});
	}

};
module.exports = verifyToken;
