const Post = require('../models/Post');

module.exports = {
    async store (req, res) {
        
        const post = await Post.findById(req.params.id);
        
        post.likes += 1;

        post.save();
        
        // let everyone know about this
        req.io.emit('like', post);

        return res.json(post);
    },

}