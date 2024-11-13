const { Schema, model } = require("mongoose");

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    otpPurpose: {
      type: String,
    },
    refreshToken: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const tokenModel = model("token", tokenSchema);

module.exports = tokenModel;
