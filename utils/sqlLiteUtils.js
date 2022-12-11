const sql = require('sqlite3')
const configs = require(`${process.cwd()}/configs/config.json`)

// ONLY FOR TESTING ENV
if (configs.sql.verbose) {
    sql.verbose()
    console.log('Verbose mode is on, change this setting in config.json')
}
/** Define the path for the file */
const fileName = `${process.cwd()}/${configs.sql.file_name}`

/** Open the sql file */
let db = new sql.Database(fileName, (status) => {
    if (status && status.code === "SQLITE_CANTOPEN") console.log(status.code)
    else console.log(configs.sql.file_name, 'was open successfully')
})

/**
 * Build the column query
 * @param columns {[{column_name: string, column_type:string}]} list of columns
 * @returns {string}
 */
function buildColumnsQuery(columns){
    let string = ''
    columns.forEach(column =>{
        string += `${column.column_name} ${column.column_type}, `
    })
    return string.slice(0, -2)
}

/**
 * Create a new table
 * @param table_name {string} the name of the table
 * @param columns {[{column_name: string, column_type:string}]} list of columns
 * @returns {Promise<void>}
 */
async function createTable(table_name, columns) {

    const query = `CREATE TABLE IF NOT EXISTS ${table_name} (${buildColumnsQuery(columns)})`

    return new Promise((resolve)=>{
        db.run(query, (()=>{
            return resolve()
        }))
    })

}

/**
 * Execute a quert
 * @param query {string}
 * @returns {Promise<unknown>}
 */
async function executeSQL(query) {

    return new Promise((resolve)=>{
        db.run(query, (response)=>{
            return resolve(response)
        })
    })

}

module.exports = {
    createTable,
    executeSQL
}