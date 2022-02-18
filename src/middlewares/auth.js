import jwtToken from '../services/JWTToken.js';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({error: 'Token not provided'});

    const [, token] = authHeader.split(' ');

    try{
        const decoded = await jwtToken.validateToken(token);
        req.userId = decoded.id;
        return next();
    }catch(error){
        console.log(error);
        return res.status(401).json({error: 'Error on Token Validation'});
    }
}