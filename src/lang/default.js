const lang = {
	validationMessage: {
		required: {
			name: "Name is required.",
			email: "Email is required.",
			username: "Username is required.",
			password: "Password is required.",
		},
		minLength: {
			name: "Minimum of :MIN_LENGTH characters are required for Name.",
			email: "Minimum of :MIN_LENGTH characters are required for Email ID.",
			username: "Minimum of :MIN_LENGTH characters are required for User Name.",
			password: "Minimum of :MIN_LENGTH characters are required for Password.",
		},
		maxLength: {
			name: "Maximum of :MAX_LENGTH characters are allowed for Name.",
			email: "Maximum of :MAX_LENGTH characters are allowed for Email ID.",
			username: "Maximum of :MAX_LENGTH characters are allowed for User Name.",
			password: "Maximum of :MAX_LENGTH characters are allowed for Password.",
		},
		regex: {
			name: "Invalid Name.",
			email: "Invalid Email ID.",
			username: "Invalid User Name.",
			password: "Invalid Password.",
		},
	},
	message: {
		userSignupSuccess: "User signup successful.",
		userSigninNoUserFound: "Entered username or password is incorrect.",
		userSigninUserFound: "User found.",
		userSigninWrongPassword: "Entered username or password is incorrect.",
	},
	statusMessages: {
		ER_DUP_ENTRY: {
			statusCode: 409,
			message: "Duplicate entry.",
		},
		ER_NO_SUCH_TABLE: {
			statusCode: 500,
			message: "Internal Server Error.",
		},
		VALIDATION_FAIL: {
			statusCode: 412,
			message: "Validation failed.",
		},
		NO_ROWS_FOUND: {
			statusCode: 401,
			message: "No results.",
		},
		CREDENTIAL_DONOT_MATCH: {
			statusCode: 401,
			message: "Unauthorised request.",
		},
		INTERNAL_SERVER_ERROR: {
			statusCode: 500,
			message: "Internal Server Error.",
		},
		NO_INPUT_DATA: {
			statusCode: 503,
			message: "Not data received.",
		},
		USER_ADDED: {
			statusCode: 200,
			message: "User signup successful.",
		},
		SIGNIN_SUCCESS: {
			statusCode: 200,
			message: "User signin successful.",
		},
		TokenExpiredError: {
			statusCode: 401,
			message: "Unauthorised request.",
		},
		USER_AUTHENTICATED: {
			statusCode: 200,
			message: "Authenticated successfully.",
		},
	},
	internalErrorMessages: {
		passwordCompareError: "Password compare failed.",
	},
};

module.exports = lang;
