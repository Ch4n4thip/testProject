 //const bcrypt = require("bcryptjs")

export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const  { email , password , name , birth_date } = req.body

    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      let dbo =   db.db("Ject_Jobe");
      let myobj =  { email: req.body.email , name : req.body.name , password : req.body.password , birthdate : req.body.birth_date} 
      let same =  { email: req.body.email }   
      let CheckM = await dbo.collection("User").findOne( {email} ) 
      if(CheckM){ 
       // console.log("have it") }
          console.log("Have M")
          return  res.status(400).send("Have it");
        }
      
 
  
      
       dbo.collection("User").insertOne(myobj, function(err, res) {
          if (err) throw err;
         console.log("Created Data"); 
       
    });
    
          
   })
} 