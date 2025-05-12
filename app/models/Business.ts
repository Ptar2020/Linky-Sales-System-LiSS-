import { models, model, Schema } from "mongoose";

const businessSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },

    subscribed: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Business = models.Business || model("Business", businessSchema);

export default Business;
