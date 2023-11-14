import express, {json, Router} from "express";
import cors from "cors";
import "express-async-errors";
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.router";
import {config} from "./config/config";
import {AdRecord} from './records/ad.record';

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

//const router = Router();

app.use('/api/ad', adRouter);

//app.use('/api', router);
// const router = Router();
// router.use('/ad', adRouter);
// app.use('/api', adRouter);

//sprawdzenie czy działa obsługa błędów:
// app.get( '/', async (req, res) => {
//   throw new Error('my error!');
// } );
// app.get( '/', async (req, res) => {
//     throw new ValidationError('my validation error!');
// } );

app.use(handleError);

app.listen(3001, '0.0.0.0', () => { //port 3001, because 3000 is taken by frontend
    console.log('Listening on port: http://localhost:3001');
});
