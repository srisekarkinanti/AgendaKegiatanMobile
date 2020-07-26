var pool = require('./databaseConfig.js');
var tabarunewDB ={
	getNoteByid: function (idnote, callback){
		pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connection!");
                var sql = 'SELECT * FROM  notes where idnote = ?';
                conn.query(sql, [idnote], function (err, result) {
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

    getNote: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connection!");
                var sql = 'SELECT * FROM notes';
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
    },

     addNote: function (noteData, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO notes (idtopic, tanggal, deskripsi, mulai, selesai, catatan, iduser) values (?,?,?,?,?,?,?)';
                conn.query(sql, [noteData.idtopic, noteData.tanggal, noteData.deskripsi, noteData.mulai, noteData.selesai, noteData.catatan,noteData.iduser], function (err, result) {
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

    deleteNote: function (idnote, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM notes WHERE idnote=?';
                conn.query(sql, [idnote], function (err, result) {
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
     getPerUser: function(iduser, callback)  {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT notes.* FROM notes WHERE iduser=? ORDER BY notes.idnote DESC';
                conn.query(sql, [iduser], function (err, result) {
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
