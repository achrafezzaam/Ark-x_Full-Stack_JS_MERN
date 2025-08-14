const express = require('express');

const postRouter = require('./routes/postRoutes');

const app = express();
app.use(express.json());

const port = 3000;

const logger = (req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(`${req.time} - ${req.method} method on ${req.url}`);
    next();
};

app.use(logger);

app.get('/', (req, res) => {
    res.send('Welcome to the Blog API\n');
});

app.use('/posts', postRouter);

app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.stack}`);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'An internal server error occurred'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});