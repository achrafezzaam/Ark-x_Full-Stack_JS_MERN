const fs = require('fs').promises;

const getAllPosts = async () => {
    const data = await fs.readFile('./data.json', 'utf8');
    return JSON.parse(data);
};

const getPost = async (postId) => {
    const data = await fs.readFile('./data.json', 'utf8');
    const posts = JSON.parse(data);
    const post = posts.find(p => p.id === postId);
    return post; // Will return the post or undefined
};

const createPost = async (newPostData) => {
    const data = await fs.readFile('./data.json', 'utf8');
    const posts = JSON.parse(data);
    const newPost = { id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, ...newPostData };
    posts.push(newPost);
    await fs.writeFile('./data.json', JSON.stringify(posts, null, 2), 'utf8');
    return newPost;
};

const updatePost = async (postId, postUpdateData) => {
    const data = await fs.readFile('./data.json', 'utf8');
    const posts = JSON.parse(data);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
        return null; // Indicates post not found
    }
    const updatedPost = { ...posts[postIndex], ...postUpdateData };
    posts[postIndex] = updatedPost;
    await fs.writeFile('./data.json', JSON.stringify(posts, null, 2), 'utf8');
    return updatedPost;
};

const deletePost = async (postId) => {
    const data = await fs.readFile('./data.json', 'utf8');
    let posts = JSON.parse(data);
    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== postId);
    if (posts.length === initialLength) {
        return false; // Indicates no post was deleted
    }
    await fs.writeFile('./data.json', JSON.stringify(posts, null, 2), 'utf8');
    return true;
};

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };
