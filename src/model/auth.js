const commonModel = require("./common");
const jwt = require("jsonwebtoken");
const { User } = require("./../../models");

exports.validateUserSignup = (data = {}) => {
  log.debug("user signup validator called");
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
  log.debug("user signin validator called");
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
  log.debug("db call here for user signup");
  return new Promise((resolve, reject) => {
    const { name, email, username, hashedPassword, isActive, role } = data;
    User.create({
      name,
      email,
      username,
      hashed_password: hashedPassword,
      is_active: isActive,
      role,
      date_created: new Date().getTime(),
    })
      .catch((err) => {
        reject(err);
      })
      .then((res) => {
        resolve(res);
      });
  });
};

exports.getHashedPassword = (data = {}) => {
  log.debug("db call here for user signin");
  return new Promise((resolve, reject) => {
    const { username } = data;
    User.findOne({
      where: { username },
      attributes: ["id", "name", "hashed_password"],
    })
      .then((res) => {
        resolve(commonModel.getResolveObjectOfSql(res, "select"));
      })
      .catch((err) => {
        reject(commonModel.getRejectObjectOfSql(err));
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
