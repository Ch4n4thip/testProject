
export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const { name, date , tel , gender } = req.body
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
  
    MongoClient.connect(url, async function (err, db) {
      if (err) throw err;
      var dbo = db.db("Ject_Jobe");
      var CheckM = await dbo.collection("User").findOne({ email : "123@gmail.com" })
      var newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender}};
      if (CheckM) {
            dbo.collection("User").updateOne(CheckM,newValue )
            res.status(200).send({message: "Changed Your info"})   
      }else { 
        return res.status(400).send({message: "Don't have this email"}) 
      }
    });
  }
  