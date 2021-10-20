import express, { Router } from "express";

import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route         /
Descrip       Get user data
Params        _id
Access        Public
Method        GET
*/
Router.get("/:_id", async(req,res) => {
    try {
        const {_id} = req.params;
        const getUser = await UserModel.findById(_id);
        return res.json({user: getUser});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route         /update
Descrip       Update an user data
Params        _userId
Access        Public
Method        PUT
*/
Router.get("/update/:_userId", async(req,res) => {
    try {
        const {_userId} = req.params;
        const {userData} = req.body;
        const updateUserdata = await UserModel.findByIdAndUpdate(
            _userId,
            {
                $set: userData
            },
            {new: true}
        );
        return res.json({user: updateUserdata});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});