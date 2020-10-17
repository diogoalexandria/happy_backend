import { request, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Opharnage';
import orphanageView from '../views/orphanageView';

export default {
    async index(req: Request, res: Response) {
        const orphanageRepo = getRepository(Orphanage);
        const orphanages = await orphanageRepo.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanages))
    },
    async show(req: Request, res: Response) {
        const { id } = request.params;

        const orphanageRepo =  getRepository(Orphanage);
        const orphanage = await orphanageRepo.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanageView.render(orphanage));
    },
    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return { path : image.filename }
        });
    
        const orphanagesRepo = getRepository(Orphanage);
        const orphanage = orphanagesRepo.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });
    
        await orphanagesRepo.save(orphanage);
    
        return res.status(201).json(orphanage);
    }
}