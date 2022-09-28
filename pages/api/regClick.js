export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo =   db.db("Ject_Jobe");
      var myobj =  { email: req.body.email , name : req.body.name , password : req.body.password , birthdate : req.body.birth_date} 
      var same =  { email: req.body.email }   
      var Check = await dbo.collection("User").findOne( same ) 
      if(Check){ 
       // console.log(same)
         
        console.log("Have It")}
      else{
       dbo.collection("User").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Created Data"); 
       
      }); }
      res.send(req.body.email);


    
    });
} 