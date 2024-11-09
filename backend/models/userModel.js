const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new Schema(
  {
    googleId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePictureURL: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      // Custom validator to require password only if not a Google user
      required: function () {
        // Password is required only if googleId is not provided (i.e., for email/password users)
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ["admin", "mentor", "mentee"],
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    interest: {
      type: Array,
    },
    country: {
      type: String,
    },
    languages: {
      type: Array,
    },
    twitterUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    facebookUrl: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    yearsOfExperience: {
      type: String,
    },
    mentorIdcard: {
      type: Array,
    },
    education: [
      {
        schoolName: {
          type: String,
        },
        degree: {
          type: String,
        },
        startYear: {
          type: String,
        },
        endYear: {
          type: String,
        },
      },
    ],
    workExperience: [
      {
        company: {
          type: String,
        },
        role: {
          type: String,
        },
        industry: {
          type: Array,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        briefContribution: {
          type: String,
        },
      },
    ],
    expertise: {
      type: Array,
    },
    about: {
      type: String,
    },
    accountStatus: {
      type: String,
      enum: ["pending", "completed", "suspended"],
    },
  },
  { timestamps: true }
);
userSchema.plugin(mongoosePaginate);

const userModel = model("user", userSchema);
module.exports = userModel;
