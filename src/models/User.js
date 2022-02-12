import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import hashService from '../services/Hash.js';
import jwtToken from '../services/JWTToken.js';

const UserSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await hashService.hashPassword(this.password);
    next();
});

UserSchema.methods.validatePassword = async function(password) {
    try{
        return await bcrypt.compare(password, this.password);
    }catch(error){
        console.log(error);
        return {error: 'Error on password validation'};
    } 
}

UserSchema.methods.generateToken = async function(){
    try{
        const id = this._id;
        return await jwtToken.generateToken({id});
    }catch(error){
        console.log(error);
        return {error: 'Error on generating token'};
    } 
}

export default mongoose.model('User', UserSchema);