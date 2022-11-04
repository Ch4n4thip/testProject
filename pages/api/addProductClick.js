export default async function handler(req, res) {
  var MongoClient = require("mongodb").MongoClient;
  const { Email, productName, price, amount, category, detail, imgProduct } = req.body;

  var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
  const query = req.query;
  console.log(query.Email);
  const EmailModify = Email?.replaceAll('"', "");
  const getEmail = query.Email?.replaceAll('"', "");
  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    const dbo = db.db("Ject_Jobe");
    switch (req.method) {
      case "GET":
         try{  
            await dbo.collection('Product')
                .find({Email:getEmail})
                .project({
                    _id: 0,
                    Email: 1,
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
      case "POST":
        let myobj = {
          Email: EmailModify,
          productName: req.body.productName,
          price: req.body.price,
          amount: req.body.amount,
          category: req.body.category,
          detail: req.body.detail,
          imgProduct: req.body.img,
          addDate:  new Date().toLocaleDateString("th-TH", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        };
        res.status(200).send("success");

        dbo.collection("Product").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("Created Data");
        });
        break;

      default: // Method not allowed
        res.status(405).end();
        break;
    }
  });
}
