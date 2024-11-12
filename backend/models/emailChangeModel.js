const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const emailChangeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    newEmail: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

emailChangeSchema.plugin(mongoosePaginate);

const emailChangeModel = model("emailChange", emailChangeSchema);

module.exports = emailChangeModel;
