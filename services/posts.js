const Post = require('../models/posts');

const createPost = async (postData) => {
    const post = await Post.create(postData);
    return post;
}

const getAllPosts = async (query) => {
    let { page = 1, limit = 10 } = query;
    page = Number(page);
    limit = Number(limit);
    const postsPromise = await Post.find({}, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const totalPromise = await Post.countDocuments();
    const [posts, total] = await Promise.all([postsPromise, totalPromise]);
    const pagenation = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
    return {posts, pagenation};
}

const getPostById = async (id) =>{
    const post = await Post.findById(id);
     
    if(!post){
        return null;
    }
    return post;
} 

const updatePost = async (id, postData) =>{
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, postData, { new: true });
    
    if(!updatedPost){
        return null;
    }

    return updatedPost;
}

const deletePost = async (id) =>{
    const deletedPost = await Post.findOneAndDelete({_id: id});

    if(!deletedPost){
        return null;
    }
    return deletedPost;
}

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost};