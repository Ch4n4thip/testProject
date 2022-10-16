import jwt from 'jsonwebtoken' ; 

export default async function handler(req, res) {
  var MongoClient = require('mongodb').MongoClient;
  const { email, password } = req.body
  var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("Ject_Jobe");
    var CheckM = await dbo.collection("User").findOne({ email })
 
      const payload = {
      user: {
        email: CheckM.email,
        name: CheckM.name,
        role: CheckM.role,
        tel: CheckM.Tel,
        birthdate: CheckM.birthdate ,
        gender: CheckM.gender,
        address: CheckM.Address
      }
    }
  
  console.log(CheckM)
  console.log(password)
    if (CheckM) {
      
      
      if (CheckM.password == password) {
        //res.status(200).send({message: "Success"})
        jwt.sign(
          payload , "logmail" , { expiresIn : 3600 } , ( err, token) => {
            if(err) { throw err ; }
             res.status(200).json({token,payload})
          }

        )
        console.log(payload)
        
      }
      else { res.status(400).send({message: "Email or password incorrect"}) }
    }else { 
      return res.status(400).send({message: "Don't have this email"}) 
    }
  });
}
