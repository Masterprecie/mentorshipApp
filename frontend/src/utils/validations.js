import { object, string, ref, array } from "yup";

export const loginValidationSchema = () => {
  return object({
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
  });
};
export const forgetPasswordValidationSchema = () => {
  return object({
    email: string().email().required("Email is required"),
  });
};
export const resetPasswordValidationSchema = () => {
  return object({
    otp: string().required("OTP is required"),
    newPassword: string().required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
};
export const changePasswordValidationSchema = () => {
  return object({
    oldPassword: string().required("Password is required"),
    newPassword: string().required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
};

export const registerValidationSchema = (requiredFields) => {
  const schema = {
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
    phoneNumber: string().required("Phone Number is required"),
    interest: array()
      .of(string())
      .max(2, "You can select a maximum of 2 interests")
      .required("Interest is required"),
    age: string().required("Age is required"),
    gender: string().required("Gender is required"),
    yearsOfExperience: string().required("Years of Experience is required"),
    about: string().required("About is required"),
    linkedinUrl: string().required("LinkedinUrl is required"),
    expertise: array()
      .of(string())
      .max(2, "You can select a maximum of 2 expertise")
      .required("Expertise is required"),
  };

  // Make fields optional if they are not in the requiredFields array
  Object.keys(schema).forEach((key) => {
    if (!requiredFields.includes(key)) {
      schema[key] = schema[key].notRequired();
    }
  });

  return object(schema);
};

export const contactValidationSchema = () => {
  return object({
    fullName: string().required("Full Name is required"),
    email: string().email().required("Email is required"),
    message: string().required("Message is required"),
    phoneNumber: string().required("Phone Number is required"),
  });
};

export const changeEmailValidationSchema = () => {
  return object({
    newEmail: string().required("Email is required"),
    reason: string().required("Reason for change is required"),
  });
};
