import 'dotenv/config';

export default {
    secret: process.env.JWT_SECRET,
    iss: process.env.JWT_ISSUER,
    expiresIn: '1d'
}