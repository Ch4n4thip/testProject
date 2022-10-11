
 export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const  { productName , price, type, category, detail,imgProduct,imgProduct2,imgProduct3} = req.body

    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      let dbo =   db.db("Ject_Jobe");
      let myobj =  { productName: req.body.productName , 
         price : req.body.price , 
         type : req.body.type , 
         category : req.body.category,
         detail: req.body.detail,
         imgProduct: req.body.img,
         imgProduct2: req.body.imgProduct2,
         imgProduct3: req.body.imgProduct3,
        } 
        res.status(200).send("success");

      
       dbo.collection("editStock").insertOne(myobj, function(err, res) {
          if (err) throw err;
         console.log("Created Data"); 
       
    });
    
          
   })
} 