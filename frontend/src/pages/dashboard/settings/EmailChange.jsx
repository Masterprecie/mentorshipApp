import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { alert } from "../../../utils/alert";
import { Link, useNavigate } from "react-router-dom";
import { changeEmailValidationSchema } from "../../../utils/validations";
import { useChangeEmailRequestMutation } from "../../../features/users/api";
import { useAuth } from "../../../features/auth/hook";

const EmailChange = () => {
  const navigate = useNavigate();
  const [changeEmail, { isLoading }] = useChangeEmailRequestMutation();
  const { user } = useAuth();
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
      newEmail: "",
      reason: "",
    },
    validationSchema: changeEmailValidationSchema,
    onSubmit: (values) => handleChangeEmail(values),
  });
  const handleChangeEmail = (values) => {
    changeEmail(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Email Change Request is successfully",
          timer: 3000,
          cb: () => {
            navigate("/dashboard/home");
          },
        });
        resetForm();
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

  return (
    <div className="mt-28 pb-5 px-10">
      <p className="text-sm">
        <Link to="/dashboard/settings">Settings</Link> <span> {">"} </span>{" "}
        Change Email
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] w-full space-y-5 max-w-[309px] "
      >
        {/* email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Rgistered Email
          </label>
          <div className="relative">
            <p className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4">
              {user?.email}
            </p>
          </div>
        </div>
        {/*new email */}
        <div>
          <label
            htmlFor="newEmail"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            New Email
          </label>
          <div className="relative">
            <input
              placeholder="Email"
              type="email"
              value={values.newEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newEmail"
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />
          </div>
          {touched.newEmail && errors.newEmail && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.newEmail}
            </p>
          )}
        </div>
        {/* reason for change */}
        <div>
          <label
            htmlFor="reason"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Reason For Change
          </label>
          <div className="relative">
            <textarea
              rows={5}
              placeholder="Reason for change"
              type="text"
              value={values.reason}
              onChange={handleChange}
              onBlur={handleBlur}
              name="reason"
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />
          </div>
          {touched.reason && errors.reason && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.reason}
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
      </form>
    </div>
  );
};

export default EmailChange;
