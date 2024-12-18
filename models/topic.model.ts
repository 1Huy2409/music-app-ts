import mongoose, { Schema } from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: String, //ten chu de 
    avatar: String,
    description: String,
    status: String,
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema, "topics");
export default Topic;