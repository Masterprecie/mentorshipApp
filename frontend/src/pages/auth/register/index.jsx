// import { registerValidationSchema } from "../../../utils/validations";
import { useState } from "react";
// import GoogleIcon from "assets/svg/googleIcon.svg?react";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "../../../components/tab-switch/Tabs";
import MenteeForm from "./forms/MenteeForm";
import MentorForm from "./forms/MentorForm";
import { useFormik } from "formik";
import { useRegisterMutation } from "../../../features/auth/api";
import { alert } from "../../../utils/alert";
import { registerValidationSchema } from "../../../utils/validations";

const Signup = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  const [register, { isLoading }] = useRegisterMutation();

  const registerUser = (values) => {
    console.log(values);
    const payload = {
      ...values,
      role: activeTab === 0 ? "mentee" : "mentor",
    };
    console.log(payload);

    register(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          //   alert("error", res.error.message);
          console.log(res?.message);
          return;
        }
        resetForm();
        alert({
          type: "success",
          message: "Registration successfully",
          timer: 2000,
          cb: () =>
            navigate(`/verify-email?email=${encodeURIComponent(values.email)}`),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err?.data?.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      interest: "",
      age: "",
      gender: "",
      yearsOfExperience: "",
      profilePictureURL: "",
      about: "",
      linkedinUrl: "",
      expertise: "",
    },
    validationSchema: registerValidationSchema([
      "firstName",
      "lastName",
      "email",
      "password",
      "role",
      "about",
      ...(activeTab === 0 ? ["interest"] : []),
      ...(activeTab === 1
        ? ["yearsOfExperience", "linkedinUrl", "expertise"]
        : []),
    ]),
    onSubmit: (values) => registerUser(values),
  });

  const tabs = [
    {
      label: "Mentee",
      content: (
        <div>
          <MenteeForm
            values={values}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            errors={errors}
            registerUser={registerUser}
            loading={isLoading}
            setFieldValue={setFieldValue}
          />
        </div>
      ),
    },
    {
      label: "Mentor",
      content: (
        <div>
          <MentorForm
            values={values}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            errors={errors}
            registerUser={registerUser}
            loading={isLoading}
            setFieldValue={setFieldValue}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-authBg bg-cover bg-center bg-no-repeat bg-[#000000CC] relative">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative py-2 px-5">
        <div className="lg:w-[60%] mx-auto">
          <div>
            <div className="mt-[30px]">
              <Tabs tabs={tabs} onTabChange={setActiveTab} />
            </div>
          </div>
          <div className="pt-3 pb-2 text-center">
            <p className="text-white  text-sm">
              Already have an account?{" "}
              <span className="text-[#536de2] font-semibold text-sm">
                <Link to="/login">Sign In</Link>{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
