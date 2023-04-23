const express = require('express');
const cors =  require('cors');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config()
const app = express()
const mysql =  require('mysql');
const PORT = process.env.PORT

const db= mysql.createPool({host:'localhost',user:'root',password:'',database:'Reactdb'})
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json())



app.get('/api/get',(req,res)=>{
    const sqlSelect ="SELECT * FROM movie_reviews" ;
    db.query(sqlSelect,
        (err,result)=>{res.send(result)})
})



app.post('/api/insert',(req,res)=>{
const movieName = req.body.movieName
const movieReview = req.body.movieReview
const sqlInsert= "INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)"
    db.query(sqlInsert, [movieName,movieReview], 
        (err, result)=>{console.log(result)})
})

app.delete('/api/delete/:movieName',(req,res)=>{
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews where movieName = ?";
   db.query(sqlDelete, name ,(err,result)=>{
    if(err) console.log(err) 
   })
})
app.put('/api/update',(req,res)=>{
       const name =  req.body.movieName;
       const review = req.body.movieReview;
       const sqlUpdate = "UPDATE  movie_reviews SET movieReview= ? WHERE movieName = ?";
       db.query(sqlUpdate,[review,name],(err,result)=>{
        if(err) console.log(err)
       })


})



app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
});






