import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema({
    id: {
        type: Number,
        required: true
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
    topprice: {
        type: Number
    },
    planprice: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    installment: {
        type: String
    },
    discountPercentage: {
        type: String
    },
    images:{
        type: Array,
        default: [],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
});

const ProductModel = model("Product", ProductSchema);

export default ProductModel;