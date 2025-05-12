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
    },

    available: {
      type: Boolean,
      default: true,
    },

    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
