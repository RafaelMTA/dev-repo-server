import {Router} from 'express';
import userController from '../controllers/UserController.js';

const routes = new Router();

routes.get('/api/users', userController.readAll);
routes.post('/api/users', userController.create);
routes.get('/api/users/:userId', userController.read);
routes.put('/api/users/:userId', userController.update);
routes.delete('/api/users/:userId', userController.delete);
routes.post('/api/users/login', userController.checkPassword);

// routes.get('/repositories', userController.readAll());
// routes.post('/repositories', userController.create());
// routes.get('/repositories/:repositoryId', userController.read());
// routes.put('/repositories/:repositoryId', userController.update());
// routes.delete('/repositories/:repositoryId', userController.delete());

export default routes;