import User from '../models/User.js';
import jwtToken from '../services/JWTToken.js';

class AuthController{
    signIn = async(req, res, next) => {
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user) return res.status(401).json({error: 'Invalid User'});

            if(!user.validatePassword(password)) return res.status(401).json({error: 'Invalid Password'});
            const token = await user.generateToken();
            return res.status(200).json(token);               
        }catch(error){
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        } 
    }
}

export default new AuthController();