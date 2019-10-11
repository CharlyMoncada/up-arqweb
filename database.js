var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE contact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            age INTEGER,
            address text, 
            birthCountry text, 
            notes text
            )`,
        (err) => {
            if (err) {
                console.log('Table already created')
            }
        });  
    }
});

module.exports = db