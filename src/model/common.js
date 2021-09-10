exports.validator = (config = {}, data = {}) => {
  let result = { status: true, error: {} };
  console.log("common validator called");

  for (const field in data) {
    if (config[field] != undefined) {
      //	If error found in one validation, do not check further validations for the same field. So break fieldsLoop;
      fieldsLoop: for (const validation in config[field]) {
        switch (validation) {
          case "required":
            if (config[field][validation] == true) {
              if (data[field].length == 0) {
                let errorMessage = lang.validationMessage.required[field];
                result["status"] = false;
                result.error[field] = errorMessage;
                break fieldsLoop;
              }
            }
            break;

          case "minLength":
            if (data[field].length < config[field][validation]) {
              let errorMessage = lang.validationMessage.minLength[
                field
              ].replace(":MIN_LENGTH", config[field][validation]);
              result["status"] = false;
              result.error[field] = errorMessage;
              break fieldsLoop;
            }
            break;

          case "maxLength":
            if (data[field].length > config[field][validation]) {
              let errorMessage = lang.validationMessage.maxLength[
                field
              ].replace(":MAX_LENGTH", config[field][validation]);
              result["status"] = false;
              result.error[field] = errorMessage;
              break fieldsLoop;
            }
            break;

          case "regex":
            console.log("TODO: regex check pending" + " " + field);
            break;

          default:
            break;
        }
      }
    }
  }

  return result;
};

exports.getResolveObjectOfSql = (result, type) => {
  log.debug(result);
  log.debug("result");
  let finalResult = {};
  switch (type) {
    case "select":
      finalResult = JSON.parse(JSON.stringify(result));
      break;

    case "insert":
      Object.keys(result).forEach((key) => {
        finalResult[key] = result[key];
      });
      break;

    default:
      break;
  }
  log.debug(finalResult);
  log.debug("finalResult");
  return finalResult;
};

exports.getRejectObjectOfSql = (error) => {
  let returnValue = {};
  let fields = {};
  switch (error.name) {
    case "SequelizeDatabaseError":
      returnValue = {
        sqlCode: error.original.code,
        sqlErrorNo: error.original.errno,
        sqlMessage: error.original.sqlMessage,
      };
      break;
    case "SequelizeValidationError":
      error.errors.forEach((field) => {
        fields[field.path] = {
          value: field.value,
          type: field.type,
          message: field.message,
        };
      });
      returnValue = {
        sqlCode: "VALIDATION_FAIL",
        sqlErrorNo: "",
        sqlMessage: fields,
      };
      break;
    case "SequelizeUniqueConstraintError":
      error.errors.forEach((field) => {
        fields[field.path] = {
          value: field.value,
          type: field.type,
          message: field.message,
        };
      });
      returnValue = {
        sqlCode: "ER_DUP_ENTRY",
        sqlErrorNo: "",
        sqlMessage: fields,
      };
      break;
    default:
      break;
  }
  return returnValue;
};

exports.getResponseObject = (response) => {
  let returnValue = {};
  response["data"] = !!response.data ? response.data : {};
  console.log(`response reason: ${response.reason}`);
  console.log(`response internal message: ${response.data.internalMessage}`);
  delete response.data.internalMessage;
  switch (response.reason) {
    case "USER_ADDED":
    case "SIGNIN_SUCCESS":
    case "USER_AUTHENTICATED":
    case "VALIDATION_FAIL":
    case "NO_INPUT_DATA":
    case "TokenExpiredError":
    case "ER_NO_SUCH_TABLE":
    case "ER_DUP_ENTRY":
    case "NO_ROWS_FOUND":
    case "CREDENTIAL_DONOT_MATCH":
      returnValue["statusCode"] =
        lang["statusMessages"][response.reason]["statusCode"];
      returnValue["responseBody"] = {
        statusCode: lang["statusMessages"][response.reason]["statusCode"],
        message: lang["statusMessages"][response.reason]["message"],
        responseBody: response.data,
      };
      break;

    default:
      returnValue["statusCode"] =
        lang["statusMessages"]["INTERNAL_SERVER_ERROR"]["statusCode"];
      returnValue["responseBody"] = {
        statusCode:
          lang["statusMessages"]["INTERNAL_SERVER_ERROR"]["statusCode"],
        message: lang["statusMessages"]["INTERNAL_SERVER_ERROR"]["message"],
        responseBody: {},
      };
      break;
  }
  return returnValue;
};
