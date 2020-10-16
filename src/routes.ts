import { Router } from 'express';
import orphanageController from './controllers/orphanagesController';


const routes = Router();

routes.get('/orphanages', orphanageController.index);
routes.get('orphanage/:id', orphanageController.show);
routes.post('/orphanages', orphanageController.create);

export default routes;
