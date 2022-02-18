import Repository from '../models/Repository.js';
import userHelper from '../helpers/UserHelper.js';

class RepositoryController{
    readAll = async(req, res, next) => {
        try{
            const {user_id} = req.params;
            const {q} = req.query;
            
            if(!userHelper.exists(user_id)) return res.status(404).json('No user Found');
            
            let query = {};

            if(q) { query = {url: {$regex: q}}}

            const repositories = await Repository.find({userId: user_id, ...query});
            if(!repositories) return res.status(404).json('No repositories found');         

            return res.status(200).json(repositories);
        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    create = async(req, res, next) => {
        try{
            const {user_id} = req.params;
            const {name, url} = req.body;

            if(!userHelper.exists(user_id)) return res.status(404).json('No user found');
            const repository = await Repository.findOne({userId: user_id, url});
            if(repository) return res.status(422).json({ message: `${name} already registered`});

            const newRepository = await Repository.create({userId: user_id, name, url});
            return res.status(200).json(newRepository);
        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    read = async(req, res, next) => {
        try{
            const {user_id, repository_id} = req.params;

            if(!userHelper.exists(user_id)) return res.status(404).json('No user found');
            
            const repository = await Repository.findOne({userId: user_id, url});
            if(!repository) return res.status(404).json('No repository found');
            return res.status(200).json({message: 'success', data: repository});
        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    update = async(req, res, next) => {
        try{
            const {user_id, repository_id} = req.params;
            const {name, url} = req.body;

            if(!userHelper.exists(user_id)) return res.status(404).json('No user found');

            const repository = await Repository.findOne({userId: user_id, _id: repository_id});
            if(!repository) return res.status(404).json('No repository found');
            await repository.updateOne({name, url});
            return res.status(200).json({message: 'success', data: repository});
        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    delete = async(req, res, next) => {
        try{
            const {user_id, repository_id} = req.params;
            if(!userHelper.exists(user_id)) return res.status(404).json('No user found');

            const repository = await Repository.findOne({userId: user_id, _id: repository_id});
            if(!repository) return res.status(404).json('No repository found');
            await repository.deleteOne();

            return res.status(200).json({message: 'success'});
        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }
}

export default new RepositoryController();