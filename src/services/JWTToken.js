import 'dotenv/config';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import authConfig from '../config/auth.js';

class JWTToken{
    generateToken = async(payload) => {
        try{
            const token = await jwt.sign(payload, authConfig.secret,{
                expiresIn: authConfig.expiresIn,
                issuer: process.env.JWT_ISSUER
            });
            return token;
        }catch(error){
            console.log(error);
        }      
    }

    validateToken = async(token) => {
        try{
            return await promisify(jwt.verify)(token, authConfig.secret, {
                algorithms: [process.env.JWT_ALGORITHMS || 'HS256'],
                issuer: process.env.JWT_ISSUER
            });
        }catch(error){
            console.log(error);
        }
    }
}

export default new JWTToken();