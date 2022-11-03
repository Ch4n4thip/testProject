
 export default async function getAllProduct(req, res) {
    var MongoClient = require('mongodb').MongoClient;

    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        
            const dbo = db.db("Ject_Jobe");
            switch (req.method) {
              
              case "GET":
                
                try {
        
                  await dbo
                  .collection("Product")
                    .find({})
                    // .project({
                    //   _id: 0,
                    //   Email: 1,
                    //   fullName: 1,
                    //   shopName: 1,
                    //   cardPCC: 0,
                    //   bankName: 0,
                    //   bookBank: 0,
                    //   phone: 1,
                    //   address: 1,
                    //   imgCard: 0,
                    //   addDate: 1,
                    //   lastUpdate: 1,
                    // })
                    .toArray((err, result) => {
                      if (err)
                        res.status(400).send({ message: "Cannot connect to database" });
                        // console.log(getEmailModify);
                      res.send(result);
                      console.log(result);
                      
                      console.log("Get Data Success");
                    });
                  
                    
                  } catch (err) {
                    res.status(400).send({ message: "Error to get data", err });
                  }
                break;
                case "POST":
                    try{  
            await dbo.collection('Product')
                .find({})
                .project({
                    _id: 0,
                    productName: 1,
                    category: 1,
                    price: 1,
                    imgProduct: 1,
                    addDate: 1,
                    lastUpdate: 1,
                }).toArray( (err, result) => {
                    if(err) res.status(400).send({ message: 'Cannot connect to database'})
                    res.send(result)
                })
                
        }catch(err){
            res.status(400).send({message: 'Error to get data', err})
        }
    
        break;

        default: // Method not allowed
          res.status(405).end();
          break;
   }})
} 