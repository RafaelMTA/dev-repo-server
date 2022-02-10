import model from '../models/Repository.js';

class RepositoryController{
    readAll = async(req, res, next) => {
        try{
            const repositories = await model.find({});
            if(!repositories) return res.status(404).json('No repositories found');
            return res.status(200).json({data: repositories});
        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    create = async(req, res, next) => {
        try{

        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    read = async(req, res, next) => {
        try{

        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    update = async(req, res, next) => {
        try{

        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }

    delete = async(req, res, next) => {
        try{

        }catch(error){
            console.log(error);
            return res.status(500).json('Internal server error');
        }
    }
}

export default new RepositoryController();