export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo =   db.db("Ject_Jobe");
      var emailC =  { email: req.body.email  } 
      var passwordC =  { password : req.body.password }   
      console.log(passwordC)
      console.log(emailC)
      console.log("START")  
      var CheckForLogin = await dbo.collection("User").aggregate([
        {
          "$match": {
            email: emailC,
            password : passwordC
          }
        }
      ])
        
      
      
      if(CheckForLogin){console.log("OK")}
      else{ console.log("fail") }
      });   
            res.send(req.body.email);                      
        }
