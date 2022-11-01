export default async function getProfileSeller(req, res) {
    const { Email, getEmail } = req.body;
    var MongoClient = require('mongodb').MongoClient;

    var url = "mongodb+srv://Admin:1234@cluster0.fv0r6up.mongodb.net/test";
    
    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        console.log(getEmail === Email);
        console.log(getEmail);
        try{
            
            const dbo = db.db("Ject_Jobe")
            await dbo.collection('ProfileSeller')
            
            .find({Email: getEmail})
            .project({
                _id: 0,
                Email: 1,
                img: 1,
                addDate: 0,
                lastDate: 1,
            }).toArray( (err, result) => {
                if(err) res.status(400).send({ message: 'Cannot connect to database'})
                res.send(result)
                console.log(result);
                console.log("Get Data Success");
                
                })
            }catch(err){
                res.status(400).send({message: 'Error to get data', err})
            }
            })
        }