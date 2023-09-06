import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()

.get('/search/:name?', async (req,res) => {
    const ads = await AdRecord.findAll(req.params.name ?? '');
    res.json(ads);//wyświetla wyszukiwane ogłoszenie
})

.get('/:id', async (req,res) => {
    const ad = await AdRecord.getOne(req.params.id);
    res.json(ad); //wyświetla pojedyńcze ogłoszenie
})

.post('/', async (req,res) => {
    const ad = new AdRecord(req.body);
    await ad.insert();
    res.json(ad);
})

