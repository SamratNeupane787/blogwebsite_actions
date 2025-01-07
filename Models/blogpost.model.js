import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogSchema);

export default BlogPost;
