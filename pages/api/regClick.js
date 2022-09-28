
export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo =   db.db("Ject_Jobe");
      var myobj = await { email: req.body.email};          
        dbo.collection("User").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Created Data");
       
      });  
      res.send("Hello World");
    });
  }
  

