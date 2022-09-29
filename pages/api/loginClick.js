export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo =   db.db("Ject_Jobe");
      var EmailC =  { email: req.body.email   }   
      let PassC = { password : req.body.password }
    
      console.log("START")  
      dbo.collection("User").find( {password : "asd"} , function(err , res) {
        if (err) throw err;
        console.log("Success"); 
        console.log(res)      
      });
    }) 
          
            res.send(req.body.email);                      
    }
