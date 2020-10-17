import { Router } from 'express';
import multer from 'multer';
import orphanageController from './controllers/orphanagesController';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', orphanageController.index);
routes.get('orphanage/:id', orphanageController.show);
routes.post('/orphanages', upload.array('images'), orphanageController.create);

export default routes;
