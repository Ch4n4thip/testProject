

 export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const  {Email, fullName , shopName, cardPCC, bankName, bookBank,phone,address,imgCard} = req.body
   const EmailModify = Email?.replaceAll('"', "");
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
   const query= req.query;
   const getEmailModify = query.Email?.replaceAll('"', "");
    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      
      
    const dbo = db.db("Ject_Jobe");
    switch (req.method) {
      
      case "GET":
        
        try {

          await dbo
          .collection("KYCSeller")
            .find({Email :getEmailModify})
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
                console.log(getEmailModify);
              res.send(result);
              console.log(result);
              
              console.log("Get Data Success");
            });
          
            
          } catch (err) {
            res.status(400).send({ message: "Error to get data", err });
          }
        break;
      case "POST":
       

          let myobj =  { 
         Email: EmailModify,
         fullName: req.body.fullName , 
         shopName : req.body.shopName , 
         cardPCC : req.body.cardPCC , 
         bankName : req.body.bankName,
         bookBank: req.body.bookBank,
         phone: req.body.phone,
         address: req.body.address,
         imgCard: req.body.img,
         addDate: new Date().toLocaleDateString("th-TH", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          lastDate: new Date().toLocaleDateString("th-TH", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        } 
        res.status(200).send("success");

      
       dbo.collection("KYCSeller").insertOne(myobj, function(err, res) {
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
