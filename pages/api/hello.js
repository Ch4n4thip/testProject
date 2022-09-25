// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Ject_Jobe");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("User").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      
    });
    dbo.collection("History").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      
    });
    res.send("Hello World");
    
  });
}
