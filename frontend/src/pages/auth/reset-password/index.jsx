import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../../features/auth/api";
import { alert } from "../../../utils/alert";
import { ClipLoader } from "react-spinners";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cpasswordVisible);
  };
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = (values) => {
    const payload = {
      otp: values.otp,
      password: values.newPassword,
    };

    resetPassword(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Password Changed Successfully",
          timer: 2000,
          cb: () => navigate("/login"),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err?.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        otp: "",
        newPassword: "",
      },
      //    validationSchema: LoginValidationSchema,
      onSubmit: (values) => handleResetPassword(values),
    });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] w-full space-y-5 max-w-[559px] mx-auto px-4"
      >
        <div className="text-center text-2xl font-bold">Forget Password</div>
        {/* otp */}
        <div>
          <label
            htmlFor="otp"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            OTP Code
          </label>
          <input
            type="number"
            placeholder="Enter the otp code sent to your email"
            value={values.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            name="otp"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.otp && errors.otp && (
            <p className="text-red-500 font-semibold text-sm">{errors.otp}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            New Password
          </label>
          <div className="relative">
            <input
              placeholder="Enter your new password"
              type={passwordVisible ? "text" : "password"}
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newPassword"
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />{" "}
            {passwordVisible ? (
              <AiOutlineEye
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          {touched.newPassword && errors.newPassword && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.newPassword}
            </p>
          )}
        </div>
        {/* Comfirm Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              placeholder="Enter your password"
              type={cpasswordVisible ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />{" "}
            {cpasswordVisible ? (
              <AiOutlineEye
                onClick={toggleCPasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={toggleCPasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="pt-5 col-span-2">
          <button
            type="submit"
            className="bg-blue-900 py-3 px-4 text-[#FAFAFA] w-full font-bold rounded-[8px] text-base"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" loading={true} size={15} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
        <div className="w-[200px] mx-auto">
          <Link to="/login">
            <button
              type="button"
              className="py-3 px-4 text-black border  w-full font-bold rounded-[8px] text-base"
            >
              Back to Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
