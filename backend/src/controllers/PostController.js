const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require ('fs');


module.exports = {
    async index(req, res) {

        const list = await Post.find().sort('-createdAt');

        return res.json(list);
    },

    async store (req, res) {
        
        const { author, place, description, hashtags }  = req.body;
        const { filename: image } = req.file;
        
        // Resize image
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            );
         
        // remove image
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image
        });
        
        // let everyone know about this
        req.io.emit('post', post);

        return res.json(post);
    },
    
    async delete(req, res) {

        const id = req.params.id;
        const post = await Post.deleteMany( { author : 'Thiago' });
        
        
        return res.send("ok");
    },
}