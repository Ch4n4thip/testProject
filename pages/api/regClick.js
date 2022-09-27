export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo = await db.db("Ject_Jobe");
      var myobj = await { email: req.body.email};
      var Check = await dbo.collection("User").findOne( myobj ) 
      if(Check){ 
        console.log(myobj)
        return res.status(400).json("MEE LAWW")}    
        
        await  dbo.collection("User").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Created Data");
       
      });  
      res.send(req.body.email);
    });
} 