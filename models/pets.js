const mongoose = require('mongoose')
const { Schema } = mongoose

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: { type: String, default: 'http://placekitten.com/350/350'},
  weight: { type: Number, default: 'mystery weight!' },
  age: { type: String, default: 'Age not found' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

petSchema.methods.showEstablished = function() {
  return `${this.name} is ${this.age} years old and weighs a whopping ${this.weight} lbs!`
}

module.exports = mongoose.model('Pet', petSchema)