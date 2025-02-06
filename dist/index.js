"use strict";
// import express from "express"
// import { Client } from "pg";
// const app=express()
// app.use(express.json())
// const pgClinet=new Client("postgresql://neondb_owner:npg_jLi8RGHO0dEP@ep-little-glade-a8tqg1ub-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")
// pgClinet.connect()
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client("postgresql://neondb_owner:npg_jLi8RGHO0dEP@ep-little-glade-a8tqg1ub-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
pgClient.connect();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const passsword = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;
    try {
        const insertQuery = `INSERT INTO users (username,email,password) VALUES ($1, $2,$3) RETURNING id;`;
        const insertaddressQuery = `INSERT INTO addresses (user_id,city,country,street,pincode) VALUES ($1,$2,$3,$4,$5);`;
        const response = yield pgClient.query(insertQuery, [username, email, passsword]);
        console.log("ffg", response);
        const userid = response.rows[0].id;
        console.log("hbgjhbgyugyugvhj", userid);
        const addressResponse = yield pgClient.query(insertaddressQuery, [userid, city, country, street, pincode]);
        console.log("chuuuuuuuu", addressResponse);
        res.json({
            message: "signed up user "
        });
    }
    catch (err) {
        res.json({
            err
        });
    }
}));
app.listen(3000);
