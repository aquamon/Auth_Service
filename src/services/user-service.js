const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class UserService {
    
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }catch(error){
            console.log("Something went wrong in the Service Layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try{
            //Fetch the user using email
            const user = await this.userRepository.getByEmail(email);

            //Compare Incoming plainPassword with the encrypted Password

            const passwordMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error : 'Incorrect password'};
            }


            const newJWT = this.createToken({email : user.email , id : user.id});
            return newJWT;
        }catch(error){
            console.log("Something went wrong in the Signin Process");
            throw error; 
        }
    }

    createToken(user){
        try{
            const result = jwt.sign(user,JWT_KEY,{expiresIn : '1h'});
            return result;
        }catch(error){
            console.log("Something went wrong in Creating Token");
            throw error;
        }
    }

    verifyToken(token){
        try{
            const response = jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){
            console.log("Something went wrong in Verifying Token",error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        }catch(error){
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }


}

module.exports = UserService;