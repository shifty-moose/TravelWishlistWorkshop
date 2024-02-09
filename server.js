import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import countryRouter from './countriesRoutes.js';
import countrySchema from './countriesSchema.js';
import { connectToDB } from './client.js';
import Country from './countriesSchema.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/countries', countryRouter);

const startConnection = async () => {
    await connectToDB();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startConnection();

