var pool = require('./databaseConfig.js');
const event = {}

event.getAll = async(callback) => {
	await pool.query("SELECT * FROM events", function(err, result){
		if (err) {
			console.log(err)
			return callback (err, null)
		}
		else{
			console.log(result)
			return callback(null, result)
		}
	})
}

event.getById = async(idevent, callback) => {
	await pool.query("SELECT events.*, rooms.ruangan FROM events join rooms ON events.idroom = rooms.idroom WHERE idevent = ?",[idevent], function(err, result){
		if (err) {
			console.log(err)
			return callback (err, null)
		}
		else{
			console.log(result)
			return callback(null, result[0])
		}
	})
}
event.getMenunggu = async(iduser, callback) => {
	await pool.query("SELECT events.*, participants.iduser, participants.status FROM events JOIN participants ON events.idevent = participants.idevent WHERE participants.status = '0' AND participants.iduser =? ", [iduser], function(err, result){
		if(err){
			console.log(err)
			return callback(err, null)
		}
		else{
			console.log(result)
			return callback(null, result)
		}
	})
}
event.getTotalMenunggu = async(iduser, callback) => {
	await pool.query("SELECT count(participants.status) AS total_menunggu FROM participants WHERE participants.status = '0' AND iduser = ? ",[iduser], function(err, result){
		if(err){
			console.log(err)
			return callback(err, null)
		}else{
			console.log(result[0])
			return callback(null, result[0])
		}
	})
}
event.getPerUser = async(iduser, callback) => {
	var sql = "SELECT participants.iduser, events.*, participants.status,  rooms.ruangan from participants join events ON participants.idevent = events.idevent join rooms on events.idroom = rooms.idroom where participants.iduser = ? ORDER BY events.idevent DESC"
	await pool.query(sql, [iduser], (err, res) => {
		if (err) {
			console.log(err)
			return callback(err, null)
		}else{	
			console.log(res)
			return callback(null, res)
		}
	})
}

event.delete = async(iduser, idevent, callback) => {
	var sql ="DELETE FROM participants WHERE iduser = ? AND idevent = ?"
	await pool.query(sql, [iduser, idevent], function(err, res){
		if(err){
			console.log(err)
			return callback(err, null)
		}
		else{
			console.log(res)
			return callback(null, res)
		}
	})
}

event.updateParticipant = async(status, idevent, iduser, callback) => {
	var sql = "UPDATE participants SET status = ? WHERE idevent = ? AND iduser = ?"
	await pool.query(sql, [status, idevent, iduser], (err, res) => {
		if(err){
			console.log(err)
			return callback(err, null)
		}
		else{
			console.log(res)
			return callback(null, "success")
		}
	})
}

module.exports = event