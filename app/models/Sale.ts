import { models, model, Schema } from "mongoose";

const saleSchema = new Schema(
  {
    // description: {
    //   type: String,
    // },
    sale_date: {
      type: Date,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      unique: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Sale = models.Sale || model("Sale", saleSchema);

export default Sale;
