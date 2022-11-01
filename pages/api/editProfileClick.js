
export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const { name, date , tel , gender } = req.body
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
  
    MongoClient.connect(url, async function (err, db) {
      if (err) throw err;
      const dbo = db.db("Ject_Jobe");
      const CheckM = await dbo.collection("User").findOne({},{
        _id:0,
        email:1,
        name:0,
        password:0,
        birthdate:0,
        role:0,gender:0,Tel:0,Address:0})
      console.log(CheckM)
      const newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender}};
      if (CheckM != null) {
            dbo.collection("User").updateOne(CheckM,newValue )
            res.status(200).send({message: "Changed Your info"})   
      }else { 
        return res.status(400).send({message: "Don't have this email"}) 
      }
    });
  }
  