import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from './routes/user.js'
import SocialmediaRouter from './routes/Socialmedia_Routes.js'
import taskRouter from './routes/tasks.js'
import bonusRouter from './routes/dailyBonus.js'
import test from './routes/test.js'
import bodyParser from "body-parser";
import env from 'dotenv';
env.config();

const app = express();
let state = process.env.STATE;

app.use(
    cors(
      {
        origin: [`${ process.env.VERCEL_FRONT }`, `${process.env.DEV_HTTPS_FRONT}`],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
  )
);  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if(process.env.STATE === 'production') {
  app.use(express.static(path.join(__dirname, 'Client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'dist', 'index.html'));
  });
};

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use( userRouter );
app.use( SocialmediaRouter )
app.use( taskRouter );
app.use( bonusRouter )
app.use( test )

mongoose.connect
(`${process.env.DB_PASS}`, {
    dbName: "User-Auth",
})
.then(() => console.log("MongoDb is working")).catch((e) => console.log(e));
let port = process.env.PORT || 5080;
app.listen(port,   () => {
    console.log(`server is working on ${port}`);
});