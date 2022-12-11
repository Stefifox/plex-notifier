const moment = require('moment')
const sql = require('./sqlLiteUtils')

/**
 * Add a new log to the database based on the payload
 * @param payload {object}
 */
function addLog(payload){

    const {event, user, playerIP, library, media} = payload
    const currentDate = moment().format('DD/MM/yyyy HH:mm:ss.SSS')

    const query = `INSERT INTO logs(log_date, log_event, log_user, log_ip, log_library, log_media) 
                    VALUES('${currentDate}','${event}', '${JSON.stringify(user)}', '${playerIP}', '${JSON.stringify(library)}', '${JSON.stringify(media)}' )`

    sql.executeSQL(query)
}

module.exports = {
    addLog
}