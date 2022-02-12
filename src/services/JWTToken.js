import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import authConfig from '../config/auth.js';

class JWTToken{
    generateToken = async(payload) => {
        try{
            const token = await jwt.sign(payload, authConfig.secret,{
                expiresIn: authConfig.expiresIn,

            });
            console.log("Token: " + token);
            return token;
        }catch(error){
            console.log(error);
        }      
    }

    validateToken = async(token) => {
        try{
            return await promisify(jwt.verify)(token, authConfig.secret);
        }catch(error){
            console.log(error);
        }
    }
}

export default new JWTToken();