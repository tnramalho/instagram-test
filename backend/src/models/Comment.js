const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author:String,
    description:String
},{
    timestamps:true
});

module.exports = mongoose.model('Comment', CommentSchema);