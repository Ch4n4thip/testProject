
export default async function handler(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    const { email , name, date , tel , gender , img } = req.body
    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
    const query= req.query;
  //  console.log(req.body.email)
   console.log(query.email)
    const getEmailModify = query.Email?.replaceAll('"', "");
    MongoClient.connect(url, async function (err, db) {
        const dbo = db.db("Ject_Jobe");
        switch (req.method) {
      
            case "GET":
              
              try {

                await dbo
                .collection("User")
                  .find({email :getEmailModify})
                  .toArray((err, result) => {
                    if (err)
                      res.status(400).send({ message: "Cannot connect to database" });
                      console.log(query.Email);
                      console.log(getEmailModify);
                    res.send(result);
                    // console.log(result);
                    
                    console.log("Get Data Success");
                  });
                } catch (err) {
                  res.status(400).send({ message: "Error to get data", err });
                }
              break;
           
              case "POST":
                var editEmail = Email.replaceAll('"','' ) 
                var CheckM = await dbo.collection("User").findOne( { email : editEmail} ) 
          
                // console.log(Email)
                // console.log(CheckM)
                var newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender , img }};
                if (CheckM) {
                      dbo.collection("User").updateOne(CheckM,newValue )
                      res.status(200).send({message: "Changed Your info"})   
                }else { 
                  return res.status(400).send({message: "Don't have this email"}) 
                }
      
              break;
      
            default: // Method not allowed
              res.status(405).end();
              break;
          }
        });
  }
  
  