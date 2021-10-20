//env variable
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

//config
import routeConfig from "./config/route.config"


//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurent"
import Food from "./API/Food"
import Menu from "./API/Menu"
import Image from "./API/Image"

//Database connection
import ConnectDB from "./database/connection";
import { UserModel } from "./database/user";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: true}));
zomato.use(helmet());
zomato.use(cors());

const Router = express.Router();

// routeConfig(passport);

// routes
//localhost:4000/
zomato.use("/auth", Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);
zomato.use("/image",Image);

zomato.get("/", (req,res) => res.json({message: "SetUp Success Yay!!"}));



zomato.listen(4000, ()=>
ConnectDB().then(()=>console.log("Server is up and running"))
.catch(()=>console.log("DB connection failed")));