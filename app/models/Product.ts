import { models, model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   
    last_login: {
      type: Date,
    },
    
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
