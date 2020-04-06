const Post = require('../models/Post');

module.exports = {
    async store (req, res) {
        
        const { author, description }  = req.body;

        const post = await Post.findById(req.params.id);

        post.comments.push({
            author,
            description
        });

        post.save();
        
        // let everyone know about this
        req.io.emit('like', post);

        return res.json(post);
    },
    async destroy (req, res) {
        
        const post = await Post.findById(req.params.id);

        post.comments = [];

        post.save();
        console.log(post);
        
        // let everyone know about this
        req.io.emit('comment', post);

        return res.json(post);
    },

}