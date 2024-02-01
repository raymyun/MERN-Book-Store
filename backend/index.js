import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware(software that allows services/capabilities the app that are otherwise not provided by the operating system)
// This allows parsing of the request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Get / Test with Response Status of 234');
});

// Route - Adding a new book
app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: 'Provide all required fields: title, author, publishYear'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is successfully connected to the database.');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });