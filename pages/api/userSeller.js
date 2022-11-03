export default async function handler(req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var { Email, img} = req.body;
  const url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
  const query= req.query;
  const EmailModify = Email?.replaceAll('"', "");
  const getEmailModify = query.Email?.replaceAll('"', "");
  console.log(EmailModify);
  console.log(query.Email);
  MongoClient.connect(url, async function (err, db) {
    console.log(EmailModify=== Email);
        
        const dbo = db.db("Ject_Jobe");
    switch (req.method) {
      
      case "GET":
        
        try {

          await dbo
          .collection("KYCSeller")
            .find({Email :getEmailModify})
            .toArray((err, result) => {
              if (err)
                res.status(400).send({ message: "Cannot connect to database" });
                console.log(query.Email);
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
        console.log(EmailModify);
        try {
          await  dbo.collection("KYCSeller").findOneAndUpdate(
              { Email: EmailModify },
              {
                $set: {
                  img: req.body.img,
                  lastDate: new Date().toLocaleDateString("th-TH", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
                },
              },
              { returnNewDocument: true }
            ),
              (err, result) => {
                if (err) throw err;
                console.log("result", result);
                res.send(result);
                console.log("1 document updated");
              };
          

          console.log(EmailModify);
          res.status(200).send("success");
        } catch (err) {
          res.status(400).send({ message: "Error to get data", err });
          console.log(err);
        }

        break;

      default: // Method not allowed
        res.status(405).end();
        break;
    }
  });

  // MongoClient.connect(url, async function(err, db) {
  //   if (err) throw err;
  //   console.log(getEmail === Email);
  //   console.log(getEmail);
  //   try{

  //       const dbo = db.db("Ject_Jobe")
  //       await dbo.collection('ProfileSeller')

  //       .find({Email: EmailModify})
  //       .project({
  //           _id: 0,
  //           Email: 1,
  //           img: 1,
  //           addDate: 0,
  //           lastDate: 1,
  //       }).toArray( (err, result) => {
  //           if(err) res.status(400).send({ message: 'Cannot connect to database'})
  //           res.send(result)
  //           console.log(result);
  //           console.log("Get Data Success");

  //           })
  //       }catch(err){
  //           res.status(400).send({message: 'Error to get data', err})
  //       }
  //       })
}
