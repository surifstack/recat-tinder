import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
const connection_url = "mongodb+srv://surifstack:suri@@1234@cluster0.5esci.mongodb.net/tinder-db?retryWrites=true&w=majority"
import card from './module.js'
const app = express();
const port   = process.env.POST || 8001


mongoose.connect(connection_url , {

    useCreateIndex :true,
  //  useFindAndModify : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() =>console.log(`DB Connected`)).catch((err) => console.log(err));

//middleware 

app.use(express.json());
app.use(Cors());


app.get("/" , (req ,res) =>{

    res.status(200).send("welcome to tinder spi");
})

app.post("/tinder/card" , (req , res) =>{

    const dbcard = req.body;
    card.create(dbcard , (err , data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })

})

app.get("/tinder/card" , (req , res) =>{
   
  card.find((err , data)=>{

    if(err){
        res.status(500).send(err)
    }else{
        res.status(201).send(data)
    }


  })
  
    


})

app.listen(port , () => console.log(`The Port ${port}`));