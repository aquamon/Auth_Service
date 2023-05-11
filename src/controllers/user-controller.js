const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try{
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(201).json({
            message : "Successfully Create a new user",
            data  : response,
            err : {},
            success : true
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data  : {},
            err : error,
            success : false
        });
    }
}

const signIn = async(req , res)=>{
    try{
        const response = await userService.signIn(req.body.email , req.body.password);
        return res.status(200).json({
            message : "Successfully Logged In",
            data  : response,
            err : {},
            success : true
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data  : {},
            err : error,
            success : false
        });
    }
}

module.exports = {
    create,
    signIn
}