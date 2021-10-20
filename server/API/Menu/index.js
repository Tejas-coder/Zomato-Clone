import express from "express";

import {MenuModel} from "../../database/menu"
import {ImageModel} from "../../database/image"

const Router = express.Router();

/*
Route         /list
Descrip       get list of menu based on particular id
Params        _id
Access        Public
Method        GET
*/
Router.get("/list/:_id", async (req,res) => {
    try {
        const {_id} = req.params;
        const menu = await MenuModel.findOne(_id);

        return res.json({menu});
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
});

/*
Route         /image
Descrip       get menu image based on id
Params        _id
Access        Public
Method        GET
*/
Router.get("/image/:_id", async (req,res) => {
    try {
        const {_id} = req.params;
        const menus = await ImageModel.findOne(_id);

        return res.json({menus});
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
});


export default Router;