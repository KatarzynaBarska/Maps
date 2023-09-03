import express, {json} from "express";
import cors from "cors";
import "express-async-errors";
import {handleError, ValidationError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', //adres do frontendu
}));
app.use(json()); // rozkodowanie json

//Routes

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
