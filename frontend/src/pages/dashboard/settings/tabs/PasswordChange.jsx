import { useFormik } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useChangePasswordMutation } from "../../../../features/auth/api";
import { alert } from "../../../../utils/alert";
import { logout } from "../../../../features/auth/slice";
import { changePasswordValidationSchema } from "../../../../utils/validations";

const PasswordChange = () => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const [opasswordVisible, setOPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleOPasswordVisibility = () => {
    setOPasswordVisible(!opasswordVisible);
  };

  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cpasswordVisible);
  };
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const hamdleChangePassword = (values) => {
    const payload = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    console.log(payload);

    changePassword(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Password Changed successfully",
          timer: 2000,
          cb: () => dispatch(logout()),
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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: changePasswordValidationSchema,
      onSubmit: (values) => hamdleChangePassword(values),
    });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] w-full space-y-5 max-w-[309px] "
      >
        {/* oldPassword */}
        <div>
          <label
            htmlFor="oldPassword"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Old Password
          </label>
          <div className="relative">
            <input
              placeholder="Enter your old password"
              type={opasswordVisible ? "text" : "password"}
              value={values.oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="oldPassword"
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />{" "}
            {opasswordVisible ? (
              <AiOutlineEye
                onClick={toggleOPasswordVisibility}
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
                onClick={toggleOPasswordVisibility}
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
          {touched.oldPassword && errors.oldPassword && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.oldPassword}
            </p>
          )}
        </div>
        {/* newPassword */}
        <div>
          <label
            htmlFor="newPassword"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Password
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
              "Reset"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
