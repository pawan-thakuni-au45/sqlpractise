import express from "express"
import { Client } from "pg";
const app=express()
app.use(express.json())
const pgClinet=new Client("postgresql://neondb_owner:npg_jLi8RGHO0dEP@ep-little-glade-a8tqg1ub-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")
pgClinet.connect()



app.post("/signup",async (req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.passsword

    const insertQuery=`INSERT INTO users (username,email,password) VALUES ('${username}','${email}','${password}');`
    const response=await pgClinet.query(insertQuery)
    res.json({
        message:"signedup successfully"
    })
})
app.listen(3000)