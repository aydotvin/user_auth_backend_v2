require("dotenv").config();
global.lang = require("./src/lang/default");

const options = {
	logDirectory: "./log",
	fileNamePattern: "<DATE>.log",
	dateFormat: "DD-MM-YYYY",
	timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
};
global.log = require("simple-node-logger").createRollingFileLogger(options);
log.setLevel("trace");

const cors = require("cors");

//	EXPRESS INITIALISATION START
const express = require("express");
const app = express();
app.disable("x-powered-by");
//	EXPRESS INITIALISATION END

//	DB CONNECTION START
const mysql = require("mysql");
global.db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});
db.connect((err) => {
	if (err) {
		console.log("DB connection failed.");
		console.log(err);
	} else {
		log.info("DB connected.");
	}
});
//	DB CONNECTION END

//	IMPORTING ROUTES START
const authRoutes = require("./src/route/auth");
//	IMPORTING ROUTES END

//	MIDDLEWARE START
app.use(cors());
app.use(express.json()); //	For "Content-Type: application/json"
app.use(express.urlencoded({ extended: true })); //	For "Content-Type: application/x-www-form-urlencoded"
//	MIDDLEWARE END

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
	return res.status(200).json({ msg: "lel wut" });
});

const port = process.env.PORT || 42069;
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
