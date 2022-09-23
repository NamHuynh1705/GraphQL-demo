const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "authors",
  },
});

module.exports = mongoose.model("books", BookSchema);
