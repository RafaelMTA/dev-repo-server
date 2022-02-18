import User from '../models/User.js';
import jwtToken from '../services/JWTToken.js';

class AuthController{
    signIn = async(req, res, next) => {
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user) return res.status(401).json({error: 'Invalid User'});

            const validate = await user.validatePassword(password);
            if(!validate) return res.status(401).json({error: 'Invalid Password'});

            const generatedToken = await user.generateToken();
            const {id} = user;

            return res.json({user: {id, email}, token: generatedToken});               
        }catch(error){
            console.log(error);
            return res.status(500).json({error: 'Internal server error'});
        } 
    }
}

export default new AuthController();