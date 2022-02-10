import jwt from 'jsonwebtoken';

class Token{
    generateToken = async(payload) => {
        try{
            const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY);
            return token;
        }catch(error){
            console.log(error);
        }      
    }

    validateToken = async() => {
        try{
            
        }catch(error){
            console.log(error);
        }
    }
}

export default new Token();