const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    topic: {type: String, required: true}, /* faire recherche pour modifier le type */
    imageUrl: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default : Date.now},
    content: {type: String, required: true},
 });

module.exports = mongoose.model('Article', articleSchema);
