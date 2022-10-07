

 export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const  { fullName , shopName, cardPCC, bankName, bookBank,phone,address,imgCard,imgBank} = req.body

    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      let dbo =   db.db("Ject_Jobe");
      let myobj =  { fullName: req.body.fullName , 
         shopName : req.body.shopName , 
         cardPCC : req.body.cardPCC , 
         bankName : req.body.bankName,
         bookBank: req.body.bookBank,
         phone: req.body.phone,
         address: req.body.address,
         imgCard: req.body.img,
         imgBank: req.body.imgBank
        } 
        res.status(200).send("success");

      
       dbo.collection("KYCSeller").insertOne(myobj, function(err, res) {
          if (err) throw err;
         console.log("Created Data"); 
       
    });
    
          
   })
} 