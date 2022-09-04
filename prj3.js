const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
const port=80;
const mongoose =require('mongoose');
    main().catch(err=> console.log(err));
    async function main(){
        await mongoose.connect('mongodb://localhost/freshfood');
    }
const foodSchema=new mongoose.Schema({
       name : String,
       email : String,
       phone : String,
       desc : String
});
const Food =mongoose.model('Food',foodSchema);
app.use('/static',express.static('static'))
app.use(express.urlencoded())
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/views/index.html'));
})
app.get('/order',(req,res)=>{
    res.sendFile(path.join(__dirname+'/views/order.html'));
})
app.post('/',(req,res)=>{
    console.log("done");
    var data= new Food(req.body);
    data.save(function (err,data){
        if(err) return console.error(err);
      });
    Food.find(function (err,foods){
          if(err) return console.error(err);
          res.send(foods);
      });
    //fs.appendFileSync("output.txt",`${req.body.name}\n`);
    //fs.appendFileSync("output.txt",`${req.body.email}\n`);
    //fs.appendFileSync("output.txt",`${req.body.phone}\n`);
    //fs.appendFileSync("output.txt",`${req.body.desc}\n`);
    //res.sendFile(path.join(__dirname+'/views/index.html'));
}) 
app.listen(port,()=>{
    console.log(`the application started succesfully on ${port}`);
})
