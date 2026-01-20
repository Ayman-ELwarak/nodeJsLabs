const PostService = require("../services/posts");
const APIError = require("../utils/APIError");

const createPost = async (req, res) => {
    const post = await PostService.createPost(req.body);
    res.status(201).json({ message: "Post created successfully", data: post })
}

const getAllPosts = async (req, res) => {
    const {posts, pagenation} = await PostService.getAllPosts(req.query);
    res.json({
        message: "Posts fetched successfully", 
        data: posts, 
        pagenation: pagenation
    })
}

const getPostById = async (req, res) =>{
    const {id} = req.params;
    const post = await PostService.getPostById(id);
    if(!post){
        throw new APIError("Post not found", 404);
    }
    res.status(200).json({
        Post : post
    })
}

const updatePost = async (req, res) => {
    const {id} = req.params;
    
    const post = await PostService.updatePost(id, req.body);
    if(!post){
        throw new APIError("Post not found", 404);
    }
    res.json({
        message : "Post Updated Successfully !",
        post: post
    })
}

const deletePost = async (req, res) =>{ 
    const {id} = req.params;

    const deletedPost = await PostService.deletePost(id);

    if(!deletedPost){
        throw new APIError("Post not found", 404);
    }

    res.json({
        message : "Post Deleted Successfully !",
        post: deletedPost
    })
}

module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost};