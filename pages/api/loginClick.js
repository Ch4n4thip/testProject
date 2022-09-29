export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const {email , password } = req.body
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      var dbo =   db.db("Ject_Jobe");
      var CheckM =  await dbo.collection("User").findOne( { email } )
        if (CheckM) {
            console.log("have Email")
            console.log(CheckM.password)
            if(CheckM.password == password ) { console.log("success") }
            else { console.log("fail") }
          }
       
        else { return res.status(400).json("Dont have this email" ) }
        }
        
       
        // return res.status(400).send("ไม่มีอีเมลในระบบ")
         
              
      );
     
          
            res.send(req.body.email);                      
    }
