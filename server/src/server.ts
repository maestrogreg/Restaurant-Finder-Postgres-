import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import restautantRoutes from './routes/restaurant';
dotenv.config();

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/restaurants', restautantRoutes);

const PORT = process.env.PORT || 3005;

app.listen(PORT, ()=> console.log(`server is listening on http://localhost:${PORT}`));