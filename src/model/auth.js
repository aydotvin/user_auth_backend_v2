const commonModel = require("./common");
const jwt = require("jsonwebtoken");

exports.validateUserSignup = (data = {}) => {
	console.log("user signup validator called");
	//	get the required config here and share it to the common validator.. this comes from config..
	let config = {
		name: {
			required: true,
			minLength: 3,
			maxLength: 64,
			regex: "",
		},
		email: {
			required: true,
			minLength: 3,
			maxLength: 320,
			regex: "",
		},
		username: {
			required: true,
			minLength: 3,
			maxLength: 32,
			regex: "",
		},
		password: {
			required: true,
			minLength: 7,
			maxLength: 32,
		},
	};
	return commonModel.validator(config, data);
};

exports.validateUserSignin = (data = {}) => {
	console.log("user signin validator called");
	//	get the required config here and share it to the common validator.. this comes from config..
	let config = {
		username: {
			required: true,
			minLength: 3,
			maxLength: 32,
			regex: "",
		},
		password: {
			required: true,
			minLength: 7,
			maxLength: 32,
		},
	};
	return commonModel.validator(config, data);
};

exports.userSignup = (data = {}) => {
	console.log("db call here for user signup");
	return new Promise((resolve, reject) => {
		const { name, email, username, hashedPassword, isActive, role } = data;
		let sql = `INSERT INTO users (name, email, username, hashed_password, is_active, date_created, role) VALUES ('${name}','${email}','${username}','${hashedPassword}',${isActive}, NOW(),'${role}')`;
		db.query(sql, (err, result) => {
			if (err) {
				reject(commonModel.getRejectObjectOfSql(err));
			} else {
				resolve(commonModel.getResolveObjectOfSql(result, "insert"));
			}
		});
	});
};

exports.getHashedPassword = (data = {}) => {
	console.log("db call here for user signin");
	return new Promise((resolve, reject) => {
		const { username } = data;
		let sql = `SELECT id, name, hashed_password FROM users WHERE username='${username}'`;
		// let sql = `SELECT id, hashed_password FROM users`;
		db.query(sql, (err, result) => {
			if (err) {
				reject(commonModel.getRejectObjectOfSql(err));
			} else {
				resolve(commonModel.getResolveObjectOfSql(result, "select"));
			}
		});
	});
};

exports.generateAccessToken = (id) => {
	return jwt.sign({ id }, process.env.BLADE, { expiresIn: "5h" });
};

exports.validateAccessToken = (jwtToken) => {
	return new Promise((resolve, reject) => {
		jwt.verify(jwtToken, process.env.BLADE, (jwtError, payload) => {
			if (!!jwtError) {
				reject(jwtError);
			} else {
				resolve(payload);
			}
		});
	});
};
