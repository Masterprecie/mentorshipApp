import { useFormik } from "formik";
import { alert } from "../../../utils/alert";
import { useLoginMutation } from "../../../features/auth/api";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../features/auth/slice";
import { loginValidationSchema } from "../../../utils/validations";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [login, { isLoading }] = useLoginMutation();

  const loginUser = (values) => {
    console.log(values);

    login(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        } else {
          dispatch(
            setCredentials({
              user: res.user,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              is_authenticated: true,
            })
          );
        }
        resetForm();
        alert({
          type: "success",
          message: "Login successfully",
          timer: 1000,
          cb: () => {
            res.user.role === "admin"
              ? navigate("/dashboard/admin")
              : navigate("/");
          },
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
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => loginUser(values),
  });
  return (
    <div className="bg-authBg bg-cover bg-center bg-no-repeat bg-[#000000CC] relative flex flex-col justify-center items-center min-h-screen">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] w-full space-y-5 max-w-[559px] mx-auto px-4 relative"
      >
        <div className="text-center text-white text-2xl font-bold">Login</div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm text-white font-medium block pb-2"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 font-semibold text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm text-white font-medium block pb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
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
          <div className="flex items-center justify-between">
            <div>
              {touched.password && errors.password && (
                <p className="text-red-500 inline-block font-semibold text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            <Link
              to="/forget-password"
              className=" text-white font-medium text-xs"
            >
              <p>Forget Password</p>
            </Link>
          </div>
        </div>

        <div className="pt-5 col-span-2">
          <button
            type="submit"
            className="bg-blue-900 py-3 px-4 text-[#FAFAFA] w-full font-bold rounded-[8px] text-base"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" loading={true} size={15} />
            ) : (
              "Login"
            )}
          </button>
        </div>
        <div className="pt-3 pb-2 text-center relative">
          <p className="text-white text-sm">
            Don&apos;t have an account?{" "}
            <span className="text-[#536de2] font-semibold text-sm">
              <Link to="/signup">Sign Up</Link>{" "}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
