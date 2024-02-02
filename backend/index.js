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

// Route - Adding a new book to the database
app.post('/books', async (request, response) => {
    try {
        // Check that the user has provided all required fields properly
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            // Status 400 for client error
            return response.status(400).send({ message: 'Provide all required fields: title, author, publishYear'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
        // Status 201 for creation
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        // Status 500 for server error
        response.status(500).send({ message: error.message })
    }
});

// Route - Get all books from the database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        // Status 200 for success
        // Return found books
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route - Get a book from the database by ID
app.get('/books/:id', async (request, response) => {
    try {
        // Destructure request to get ID of desired book
        const { id } = request.params;
        const book = await Book.findById(id);
        // Status 200 for success
        // Return found book
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route - Update an existing book in the database
app.put('/books/:id', async (request, response) => {
    try {
        // Again, check that the user has provided all required fields properly
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: 'Provide all required fields: title, author, publishYear'});
        }
        // Destructure request to get ID of desired book
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        // Check if the book exists in the database
        // Status 404 for object not found
        if (!result) {
            return response.status(404).json({ message: 'Book with provided ID does not exist in the database.'});
        }
        else {
            // If found, status 200 for success
            return response.status(200).send({ message: 'Book was updated successfully.'});
        }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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