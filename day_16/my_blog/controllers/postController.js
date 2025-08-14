const postModel = require('../models/postModel');

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postModel.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const post = await postModel.getPost(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        const newPost = await postModel.createPost(req.body);
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const updatedPost = await postModel.updatePost(postId, req.body);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const success = await postModel.deletePost(postId);
        if (!success) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send(); // 204 No Content is standard for successful deletion
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };