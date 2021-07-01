const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES

let db = new sqlite3.Database('./db/db.myrecs');
db.run("CREATE TABLE IF NOT EXISTS recs (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, url TEXT, Content BLOB)");

const addRecAppDB = (reccontrol, res) =>{
    // code to add to the database
      console.log("ok from controllers addRecAppDB, new rec added")
      let db = new sqlite3.Database('./db/db.myrecs');
  
    // insert one row into the langs table
      db.run(`INSERT INTO recs(Name, audio_url, img_url) VALUES(?, ?, ?)`, [reccontrol.inputname, reccontrol.inputaudiourl, reccontrol.inputimgurl], function(err) {
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

const loadRecAppDB = (res) => {
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


const deleteRecAppDB = (recID) => {
  console.log("im ready to delete the rec with the id ", recID.ID )
  let db = new sqlite3.Database('./db/db.myrecs', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let id = recID.ID;
  // delete a row based on id
  db.run(`DELETE FROM recs WHERE ID=?`, id, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

const updateFavRecOnDB = (favrecId) => {
  let fav
  if(favrecId.isFav === "0"){
    fav = 1
  }else{
    fav = 0
  }
  console.log("i will update the rec with the id", favrecId.ID)
  let db = new sqlite3.Database('./db/db.myrecs');


  db.run(`UPDATE recs SET rec_fav = ? WHERE ID = ?`, [fav, favrecId.ID], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);

  });

  // close the database connection
  db.close();
}



  exports.addRecAppDB = addRecAppDB;
  exports.loadRecAppDB = loadRecAppDB;
  exports.deleteRecAppDB = deleteRecAppDB;
  exports.updateFavRecOnDB = updateFavRecOnDB;