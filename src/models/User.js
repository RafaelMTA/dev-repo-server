import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import hashService from '../services/Hash.js';

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

UserSchema.pre('findOneAndUpdate', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await hashService.hashPassword(this.password);
    next();
})

UserSchema.methods.comparePassword = async function(password, callback) {
    try{
        await bcrypt.compare(password, this.password, (err, isMatch) => {
            if(err) return callback(err);
            callback(null, isMatch);
        });
    }catch(error){
        console.log(error);
        return {error: 'Error on password validation'};
    } 
}

UserSchema.methods.generateToken = function(){
    try{
        
    }catch(error){
        console.log(error);
        return {error: 'Error on generating token'};
    } 
}

export default mongoose.model('User', UserSchema);