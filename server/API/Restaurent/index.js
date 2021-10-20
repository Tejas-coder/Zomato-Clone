import express from "express"

import {RestaurantModel} from "../../database/restaurant/index"

//Validation
import { ValidateRestaurantId, ValidateRestaurantCity,ValidateRestaurantSearchString } from "../../Validation/restaurant";

const Router = express.Router();

/*
Route:          /
Description:    Get all Restaurants details
Access:         Public
Method:         GET
*/ 
Router.get("/", async(req,res) => {
    try {
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route:          /
Description:    Get particular Reataurant by id
Params:         _id
Access:         Public
Method:         GET
*/ 
Router.get("/:_id",async (req,res) => {
    try {
        await ValidateRestaurantId(req.params);

        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne({_id});
        if(!restaurant) {
            return res.status(404).json({error: "Restaurennt not found"});
        }

        return res.json({restaurant});
    } catch(error) {
        return req.status(500).json({error: error.message});
    }
});

/*
Route:          /
Description:    Get restaurant details on search
Body:           searchString
Access:         Public
Method:         GET
*/ 
Router.get("/search",async (req,res) => {
    try {
        ValidateRestaurantSearchString(req.body);

        const {searchString} = req.body;

        const restaurant = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"}
        });

        return res.json({restaurant});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;