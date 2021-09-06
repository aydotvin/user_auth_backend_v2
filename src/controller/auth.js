const authService = require("./../service/auth");
const commonModel = require("./../model/common");

exports.userSignup = (req, res) => {
	console.log("sign up requested..");
	console.log(req.body.name);
	console.log(req.params);
	console.log(req.query);
	let data = {
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	};
	authService
		.userSignup(data)
		.then((resolveResponse) => {
			let response = commonModel.getResponseObject(resolveResponse);
			return res.status(response.statusCode).json(response.responseBody);
		})
		.catch((rejectResponse) => {
			let response = commonModel.getResponseObject(rejectResponse);
			return res.status(response.statusCode).json(response.responseBody);
		});
};

exports.userSignin = (req, res) => {
	console.log("req at node");
	console.log(req.body);
	log.debug("sign in requested..");
	let data = {
		username: req.body.username,
		password: req.body.password,
	};
	authService
		.userSignin(data)
		.then((resolveResponse) => {
			let response = commonModel.getResponseObject(resolveResponse);
			return res.status(response.statusCode).json(response.responseBody);
		})
		.catch((rejectResponse) => {
			let response = commonModel.getResponseObject(rejectResponse);
			return res.status(response.statusCode).json(response.responseBody);
		});
};

exports.userSignout = (req, res) => {
	console.log("sign out requested..");
	console.log(req.headers.token);
	let data = {
		token: req.headers.token,
	};
	authService
		.userSignout(data)
		.then((resolveResponse) => {
			let response = commonModel.getResponseObject(resolveResponse);
			return res.status(response.statusCode).json(response.responseBody);
		})
		.catch((rejectResponse) => {
			let response = commonModel.getResponseObject(rejectResponse);
			return res.status(response.statusCode).json(response.responseBody);
		});
};
