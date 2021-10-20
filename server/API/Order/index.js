import express, { Router } from "express";

import {OrderModel} from "../../database/order"

const Router = express.Router();

/*
Route         /
Descrip       Get all orders based on ID
Params        _id
Access        Public
Method        GET
*/
Router.get("/:_id", async(req,res) => {
    try {
        const {_id} = req.params;
        const getOrder = await OrderModel.findOne({user: _id});

        if(!getOrder) {
            return res.status(404).json({error: "User not Found"});
        }

        return res.json({getOrder});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route         /new
Descrip       Add new
Params        _id
Access        Public
Method        POST
*/
Router.post("/new/:_id", async(req,res) => {
    try {
        const {_id} = req.params;
        const {oredrDetails} = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id
            },
            {
                $push: {oredrDetails: oredrDetails}
            },
            {
                new: true
            }
        );

        return res.json({order: addNewOrder});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;