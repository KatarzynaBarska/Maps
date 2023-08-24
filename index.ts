import express, {json} from "express";
import cors from "cors";
import "express-async-errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', //adres do frontendu
}));
app.use(json()); // rozkodowanie json

app.listen(3001, '0.0.0.0', () => { //port 3001, because 3000 is taken by frontend
    console.log('Listening on port: http://localhost:3001');
});