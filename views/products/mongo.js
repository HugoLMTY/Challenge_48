var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://admin:admin@cluster0.1mslv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("PassionFroid");
  var myobj = { 'path': "207604.jpg", 'coll': "photoProduits/" };
  dbo.collection("products").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
