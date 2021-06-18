const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES

let db = new sqlite3.Database('./db/db.myrecs');
db.run("CREATE TABLE IF NOT EXISTS recs (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, url TEXT, Content BLOB)");

const addRecAppDB = (reccontrol, res) =>{
    // code to add to the database
      console.log("ok from controllers addRecAppDB, new rec added")
      let db = new sqlite3.Database('./db/db.myrecs');
  
    // insert one row into the langs table
      db.run(`INSERT INTO recs(Name, url) VALUES(?, ?)`, [reccontrol.input, "https://res.cloudinary.com/dlqnpg3s2/video/upload/v1623955818/sounds/gtr_dec2020_z8txiu.mp3"], function(err) {
        if (err) {
          return console.log(err.message);
        }
    // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    //   res.send(res);
  
    // close the database connection
      db.close();
}

const loadRec = (res) => {
    let sendData = { recKey: [] };
    let sql = `SELECT * FROM recs`;
    
    let db = new sqlite3.Database("db/db.myrecs", (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Ok controllers loadRec connected to myrecs db.");
    });

    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        rows.forEach((row) => {
            // console.log(row);
            sendData.recKey.push(row)
        });
      });
    //   res.send(sendData)
    });
  
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    console.log(sendData, "well, well, well");
    res.send(sendData);
    console.log("Close the database connection.");
    });
};


  exports.addRecAppDB = addRecAppDB;
  exports.loadRec = loadRec;