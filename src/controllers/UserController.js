import User from '../models/User.js';
import hashService from '../services/Hash.js';

class UserController{
    readAll = async(req, res, next) => {
        try{
            const users = await User.find();
            if(!users) res.status(422).json({
                message: 'No user found'
            });
            return res.status(200).json({
                data: users
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    create = async(req, res, next) => {
        try{
            const {email, password} = req.body;
            const exists = await User.findOne({email});
            if(exists) return res.status(422).json({
                message: `${email} already exists`
            });
            
            const newUser = await User.create({email, password});
            return res.status(201).json({message: 'Success', data: newUser});
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    read = async(req, res, next) => {
        try{
            const user = await User.findById(req.params.userId);
            if(!user) return res.status(404).json("No user Found");
            return res.status(200).json({message: 'Success', data: user});
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    update = async(req, res, next) => {
        try{
            const{email, password} = req.body;
            const user = await User.findById(req.params.id);

            if(!user) return res.status(404).json("No user Found");

            const hashPassword = await hashService.hashPassword(password);

            await user.updateOne({email, password: hashPassword});

            return res.status(200).json({message: 'Updated', data: user});
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    delete = async(req, res, next) => {
        try{
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: 'User Deleted'});
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();