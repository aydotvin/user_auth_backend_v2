const bcrypt = require("bcrypt");
const authModel = require("./../model/auth");
const jwt = require("jsonwebtoken");

exports.userSignup = (data = {}) => {
	console.log("service called - signup");
	return new Promise((resolve, reject) => {
		if (Object.keys(data).length != 0) {
			data["isActive"] = 1;
			data["role"] = "USER";
			let validationResult = authModel.validateUserSignup(data);
			if (validationResult.status == true) {
				let password = data.password;
				const saltRounds = 10;
				bcrypt
					.genSalt(saltRounds)
					.then((salt) => {
						return bcrypt.hash(password, salt);
					})
					.then((hashedPassword) => {
						data["hashedPassword"] = hashedPassword;
						return authModel.userSignup(data);
					})
					.then((response) => {
						console.log(response);
						if (response.affectedRows > 0) {
							resolve({
								reason: "USER_ADDED",
								data: {},
							});
						}
					})
					.catch((error) => {
						reject({
							reason: error.sqlCode,
							data: {
								code: error.sqlErrorNo,
							},
						});
					});
			} else {
				reject({
					reason: "VALIDATION_FAIL",
					data: validationResult,
				});
			}
		} else {
			reject({
				reason: "NO_INPUT_DATA",
				data: {},
			});
		}
	});
};

exports.userSignin = (data = {}) => {
	console.log("service called - signin");
	return new Promise((resolve, reject) => {
		if (Object.keys(data).length != 0) {
			let validationResult = authModel.validateUserSignin(data);
			if (validationResult.status == true) {
				let password = data.password;
				authModel
					.getHashedPassword(data)
					.then((response) => {
						if (response.length == 0) {
							reject({
								reason: "NO_ROWS_FOUND",
								data: { message: lang.message.userSigninNoUserFound },
							});
						} else {
							let hashedPassword = response[0].hashed_password;
							let id = response[0].id;
							let name = response[0].name;
							bcrypt.compare(password, hashedPassword, function (compareError, result) {
								if (compareError) {
									reject({
										reason: "INTERNAL_SERVER_ERROR",
										data: {
											internalMessage: lang.internalErrorMessages.passwordCompareError,
										},
									});
								}
								if (result) {
									let token = authModel.generateAccessToken(id);
									resolve({
										reason: "SIGNIN_SUCCESS",
										data: { token, name },
									});
								} else {
									reject({
										reason: "CREDENTIAL_DONOT_MATCH",
										data: { message: lang.message.userSigninWrongPassword },
									});
								}
							});
						}
					})
					.catch((error) => {
						reject({
							reason: error.sqlCode,
							data: { code: error.sqlErrorNo },
						});
					});
			} else {
				reject({
					reason: "VALIDATION_FAIL",
					data: validationResult,
				});
			}
		} else {
			reject({
				reason: "NO_INPUT_DATA",
				data: {},
			});
		}
	});
};

exports.userSignout = (data = {}) => {
	return new Promise((resolve, reject) => {
		authModel
			.validateAccessToken(data.token)
			.then((response) => {
				console.log(response);
				resolve({
					reason: "USER_AUTHENTICATED",
					data: { id: response.id, internalMessage: "user match found. Signing out.." },
				});
			})
			.catch((error) => {
				reject({
					reason: error.name,
					data: { message: error.message },
				});
			});
	});
};
