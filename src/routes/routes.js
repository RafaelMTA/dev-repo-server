import {Router} from 'express';
import userController from '../controllers/UserController.js';
import repositoryController from '../controllers/RepositoryController.js';
import authController from  '../controllers/AuthController.js';

import auth from '../middlewares/auth.js';

const routes = new Router();

routes.post('/api/signin', authController.signIn);

routes.use(auth);

routes.get('/api/users', userController.readAll);
routes.post('/api/users', userController.create);
routes.get('/api/users/:id', userController.read);
routes.put('/api/users/:id', userController.update);
routes.delete('/api/users/:id', userController.delete);

routes.get('/api/:user_id/repositories', repositoryController.readAll);
routes.post('/api/:user_id/repositories', repositoryController.create);
routes.get('/api/:user_id/repositories/:repository_id', repositoryController.read);
routes.put('/api/:user_id/repositories/:repository_id', repositoryController.update);
routes.delete('/api/:user_id/repositories/:repository_id', repositoryController.delete);

export default routes;