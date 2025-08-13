const express = require('express');
const {getAllPosts, getPost, createPost} = require('./models/post');

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/posts', async (req, res) => {
    try {
        let test = await getAllPosts();
        res.status(200).json(test);
    } catch (error) {
        res.status(500).send("Failed to retrieve the posts.")
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        let postId = req.params.id;
        postId = parseInt(postId);
        const post = await getPost(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send("Failed to retrieve the post.")
    }
});

app.post('/posts', async (req, res) => {
    try {
        data = req.body;
        await createPost(data);
        res.status(200).send("Data received successfully.");
    } catch (error) {
        res.status(500).send("Failed to receive the data");
    }
});

app.listen(port, () => {
    console.log("Server listening on port: ", port);
});
