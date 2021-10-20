import express, { Router } from "express";

import {ReviewMode} from "../../database/reviews"

const Router = express.Router();

/*
Route         /new
Descrip       Add new Rreview
Params        _None
Access        Public
Method        POT
*/
Router.post("/new", async(req,res) => {
    try {
        const {reviewData} = req.body;

        await ReviewMode.create(reviewData)
        
        return res.json({review: "Review added Successfully"});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route         /delete
Descrip       Delete Rreview
Params        _id
Access        Public
Method        POT
*/
Router.delete("/delete/:_id", async(req,res) => {
    try {
        const {_id} = req.params;

        // await ReviewMode.
        
        return res.json({review: "Review added Successfully"});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;