// import express from "express"
// import { Client } from "pg";
// const app=express()
// app.use(express.json())
// const pgClinet=new Client("postgresql://neondb_owner:npg_jLi8RGHO0dEP@ep-little-glade-a8tqg1ub-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")
// pgClinet.connect()



// app.post("/signup",async (req,res)=>{
//     const username=req.body.username;
//     const email=req.body.email;
//     const password=req.body.passsword

//     const insertQuery=`INSERT INTO users (username,email,password) VALUES ('${username}','${email}','${password}');`
//     const response=await pgClinet.query(insertQuery)
//     res.json({
//         message:"signedup successfully"
//     })
// })
// app.listen(3000)



import express from 'express'
import {Client} from "pg"

const app=express()
app.use(express.json())

const pgClient=new Client("postgresql://neondb_owner:npg_jLi8RGHO0dEP@ep-little-glade-a8tqg1ub-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")
pgClient.connect()
app.post("/signup",async (req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const passsword=req.body.password;

    const city=req.body.city;
    const country=req.body.country;
    const street=req.body.street;
    
    const pincode=req.body.pincode
    try{
    
        const insertQuery=`INSERT INTO users (username,email,password) VALUES ($1, $2,$3) RETURNING id;`

        const insertaddressQuery=`INSERT INTO addresses (user_id,city,country,street,pincode) VALUES ($1,$2,$3,$4,$5);`

        const response=await pgClient.query(insertQuery,[username,email,passsword])
        console.log("ffg",response);
        const userid=response.rows[0].id
        console.log("hbgjhbgyugyugvhj",userid);

        const addressResponse=await pgClient.query(insertaddressQuery,[userid,city,country,street,pincode])
        console.log("chuuuuuuuu",addressResponse);

        
        res.json({
            message:"signed up user "
        })
    }catch(err){
        res.json({
            err
        })
    }
    

   
})
app.listen(3000)