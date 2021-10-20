import express from "express";

//Database Model
import {FoodModel} from "../../database/food";

//Validation
import { ValidateRestaurantId, ValidateCategory } from "../../Validation/food";

const Router = express.Router();

/*
Route         /
Descrip       get all the foods based on restaurent
Params        _id
Access        Public
Method        GET
*/
Router.get("/:_id", async (req,res) => {
    try {
        await ValidateRestaurantId(req.params);

        const {_id} = req.params;
        const food = await FoodModel.find({ restaurant: _id});
        
        return res.json({food});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route         /r
Descrip       get all the foods based on category
Params        category
Access        Public
Method        GET
*/
Router.get("/r/:category", async (req,res) => {
    try {
        await ValidateCategory(req.params);

        const {category} = req.params;
        const food = await FoodModel.find({
            category: {$regex: category, $options: "i"}
        });

        return res.json({food});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;