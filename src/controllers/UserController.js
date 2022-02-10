import model from '../models/User.js';

class UserController{
    readAll = async(req, res, next) => {
        try{
            const users = await model.find();
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
            const exists = await model.findOne({email});
            if(exists) return res.status(422).json({
                message: `${email} already exists`
            });
            
            const newUser = await model.create({email, password});
            return res.status(201).json({message: 'Success', data: newUser});
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    read = async(req, res, next) => {
        try{
            const user = await model.findById(req.params.userId);
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
            const user = await model.findOne({_id: req.params.id});
            if(!user) return res.status(404).json("No user Found");
            return res.status(200).json({message: 'Updated', data: user});
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    delete = async(req, res, next) => {
        try{
            const user = await model.findByIdAndDelete(req.params.userId);
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    checkPassword = async(req, res, next) => {
        try{
            const {email, password} = req.body;
            const user = await model.findOne({email});
            if(!user) return res.status(404).json({message: 'No user found'});
            user.comparePassword(password, (err, isMatch) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({error: 'Error on user authentication'});
                }
                if(!isMatch) return res.status(405).json({message: 'Invalid Password'});
                return res.status(200).json({message: 'Authenticated', matched: isMatch});
            });                
        }catch(error){
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
}

export default new UserController();