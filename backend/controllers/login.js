const Users = require('../models/users');

exports.getUsers = async (req, res) => {
    try {
        const getUsersData = await Users.find({});
        // console.log(getUsersData);
        res.status(200).send(getUsersData);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUsersByEmail = async (req, res) => {
    // console.log(req.body.email);
    // console.log(req.body.password);
    // console.log(req);
    try {
        const getUsersData = await Users.findOne({email : req.body.email});
        let error ="" ;
        if (!getUsersData) {
            error = "No user exists, Proceed for SignUp";
            console.log(error);
            res.status(300).send(error);
        }
        else {
            if(getUsersData.password !== req.body.password) {
                error = "Invalid Password";
                console.log(error);
                res.status(400).send(error);
            }
            else {
                // console.log(getUsersData);
                res.status(200).send({
                    data:getUsersData,
                    token:1234
                });
            }
        }
    }catch (error) {
        res.status(500).send("failed to login,, please refresh and try again");
    }
};

exports.postUsers = async (req, res) => {
    try {
        // console.log(req);
        const getUsersDataEmail = await Users.findOne({email : req.body.email});
        if (getUsersDataEmail === null) {
            const getUsersData = new Users(req.body);
            await getUsersData.save();
            res.status(200).send("trues");
        }
        else {
            res.status(400).send("email already exists");
            console.log("email exists");
        }
    } catch (error) {
        res.status(500).send("tring to connect db but cannot do because of internal error");
    }
};

exports.delUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const getUsersData = await Users.findOne({_id:id});
        if(getUsersData) {
            await Users.findOneAndDelete({_id : id});
            res.status(200).send("DELETED SUCCESSFULLY");
        }
        else {
            res.status(400).send("NO RECORD WITH SPECIFIED ID FOUND");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;        
        const options = { new: true };
        const getUsersData = await Users.findOne({_id:id});
        if(getUsersData) {
            await Users.findOneAndUpdate({_id : id}, updates, options);
            res.status(200).send("UPDATED SUCCESSFULLY");
        }
        else {
            res.status(400).send("NO RECORD WITH SPECIFIED ID FOUND");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
