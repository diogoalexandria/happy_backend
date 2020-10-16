import { request, Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Opharnage';

export default {
    async index(req: Request, res: Response) {
        const orphanageRepo = getRepository(Orphanage);
        const orphanages = await orphanageRepo.find();

        return res.json(orphanages)
    },
    async show(req: Request, res: Response) {
        const { id } = request.params;

        const orphanageRepo =  getRepository(Orphanage);
        const orphanage = await orphanageRepo.findOneOrFail(id);

        return res.json(orphanage);
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
    
        const orphanagesRepo = getRepository(Orphanage);
        const orphanage = orphanagesRepo.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        });
    
        await orphanagesRepo.save(orphanage);
    
        return res.status(201).json(orphanage);
    }
}