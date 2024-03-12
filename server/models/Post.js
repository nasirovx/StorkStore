import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema({
    owner: {
        type: Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image:{
        type: String,
    },
});

const PostModel = model("Post", PostSchema);

export default PostModel;