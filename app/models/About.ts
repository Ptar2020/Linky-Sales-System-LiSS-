// import { models, model, Schema } from "mongoose";
import mongoose, { models, model, Schema } from "mongoose";
const aboutSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    last_edited: {
      type: Date,
    },
  },
  { timestamps: true }
);

const About = models.About || model("About", aboutSchema);

export default About;
