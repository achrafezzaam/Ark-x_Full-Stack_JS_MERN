const fs = require('fs').promises;

const getAllPosts = async () => {
    try {
        const data = await fs.readFile('./data.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading the json file: ", err);
        throw error;
    }
};

const getPost = async (postId) => {
    try {
        let data = await fs.readFile('./data.json', 'utf8');
        data = JSON.parse(data);
        post = data.find(post => post.id === postId);
        return post;
    } catch (error) {
        console.error("Error reading the json file", error);
    }
};

const createPost = async (newData) => {
    try {
        let data = await fs.readFile('./data.json', 'utf8');
        data = JSON.parse(data);
        newData = {id: data[data.length - 1].id + 1, ...newData};
        data.push(newData);
        data = JSON.stringify(data, null, 2);
        await fs.writeFile('./data.json', data, (err) => { console.log("The file has been successfully updated.") });
    } catch (err) {
        console.error('Error writing to the file', err);
    }
}

const updatePost = async (postId) => {};

const deletePost = async (postId) => {};

module.exports = {getAllPosts, getPost, createPost};
