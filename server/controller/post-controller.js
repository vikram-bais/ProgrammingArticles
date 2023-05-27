const express = require('express')
const router = express.Router();
const Post = require('../schema/postSchema')
const mongoose = require('mongoose');

const createPost = async (req, res) => {
    try {
        // console.log("Body: ", req.body)
        const post = await new Post({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            username: req.body.username,
            description: req.body.description,
            picture: req.body.picture,
            categories: req.body.categories,
            article: req.body.article,
            createdDate: req.body.createdDate
        });
        post.save();
        // console.log("Done")
        res.status(200).json({
            status: "Saved"
        })
    } catch (error) {
        res.status(500).json({
            status: "not saved",
            error: error
        })
    }
    
}


const getAllPost = async (req, res) => {
    try {
        let username = req.query.username;
        let category = req.query.category;
        let posts;
        if(username) posts = await Post.find({username: username});
        else if(category) posts = await Post.find({categories: category});
        else posts = await Post.find();
        // console.log("posts: ", username, category)
        res.status(200).json({
            posts
        })
        
        // console.log("Done")
    } catch (error) {
        res.status(500).json({
            status: 'unable to get',
            error: error
        })
    }
}

const getPost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        // console.log("getPost: ", post)
        res.status(200).json({
            post
        })
    } catch {
        res.status(500).json({
            status: 'unable to fetch',
            error: error
        })
    }
}


const updatePost = async (req, res) => {
    try {
        // console.log("updated: ", req.body)
        let post = await Post.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json({
            status: "Updated Successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 'unable to update',
            error: error
        })
    }
}



const deletePost = async (req, res) => {
    try {
        // console.log("updated: ", req.body)
        let post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 'unable to delete',
            error: error
        })
    }
}

module.exports = {createPost, getAllPost, getPost, updatePost, deletePost};