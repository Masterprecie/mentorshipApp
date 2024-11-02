import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../../features/auth/api";
import { alert } from "../../../utils/alert";
import { ClipLoader } from "react-spinners";
import { forgetPasswordValidationSchema } from "../../../utils/validations";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleForgetPassword = (values) => {
    console.log(values);

    forgetPassword(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Check Your Email",
          timer: 2000,
          cb: () => navigate("/reset-password"),
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
        email: "",
      },
      validationSchema: forgetPasswordValidationSchema,
      onSubmit: (values) => handleForgetPassword(values),
    });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] w-full space-y-5 max-w-[559px] mx-auto px-4"
      >
        <div className="text-center text-2xl font-bold">Forget Password</div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm text-[#474747] font-medium block pb-2"
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
export default ForgetPassword;
