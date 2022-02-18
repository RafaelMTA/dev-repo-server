import 'dotenv/config';

export default {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    expiresIn: '1d'
}