var pool = require('./databaseConfig.js');
var tabarunewDB = {

	getTopicByid: function (idtopic, callback){
		pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connection!");
                var sql = 'SELECT * FROM topics where idtopic = ?';
                conn.query(sql, [idtopic], function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },
getTopic: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connection!");
                var sql = 'SELECT * FROM topics';
                conn.query(sql, function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
	}
};
module.exports = tabarunewDB