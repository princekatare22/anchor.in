const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  comment: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      email: { type: String, required: true },
      comment: { type: String, required: true },
      reply: [
        {
          email: { type: String, required: true },
          user: {
            type: mongoose.Schema.ObjectId,
            required: true,
          },
          username: {
            type: String,
            required: true,
          },
          reply: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
