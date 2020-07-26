var pool = require('./databaseConfig.js');
const  sqlite3  =  require('sqlite3').verbose();
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const SECRET_KEY = "secretkey23456";


const user = {}

user.login = async (user, callback) => {
	await pool.query("SELECT * FROM users WHERE username = ?", [user.username], (err, res) => {
		if (err) {
			console.log(err)
			return callback (err, null)
		}
		else{
			console.log(res[0])
			return callback(null, res[0])
		}
	})
}


user.updateToken = async (iduser, token, callback) => {
	await pool.query("UPDATE users SET device_token = ? WHERE iduser = ?", [token, iduser], (err, res) => {
		if (err) {
			console.log(err)
			return callback (err, null)
		}
		else{
			console.log(res)
			return callback(null, res)
		}
	})
}


module.exports = user