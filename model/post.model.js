import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Add validation if needed
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String, // Author's name
    
    },
    category:{
      type:String,

    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Post = mongoose.model("posts", postSchema);

export { Post };
