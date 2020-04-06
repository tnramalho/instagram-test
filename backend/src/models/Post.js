const mongoose = require('mongoose');
const comment = require('./Comment');

//var comment = new mongoose.Schema({ name: String });

const PostSchema = new mongoose.Schema({
    author:String,
    place:String,
    description:String,
    hashtags:String,
    image: String,
    likes: {
        type:Number,
        default:0,
    },
    comments : {
        type: [ comment.schema ] ,
        default: [],
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Post', PostSchema);