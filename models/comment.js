const mongoose = require('mongoose')
const { Schema } = mongoose

let commentSchema = new mongoose.Schema({
    author: { type: String, default: 'Anonymous' },
    content: { type: String, default: '' }
})
  
module.exports = mongoose.model('Comment', commentSchema)