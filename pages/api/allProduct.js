
 export default async function getAllProduct(req, res) {
    var MongoClient = require('mongodb').MongoClient;

    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";

    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        try{

            const dbo = db.db("Ject_Jobe")
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
    
          
   })
} 