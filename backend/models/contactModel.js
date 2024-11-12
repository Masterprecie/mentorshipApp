const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phonoeNumber: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

contactSchema.plugin(mongoosePaginate);

const contactModel = model("contact", contactSchema);
module.exports = contactModel;
