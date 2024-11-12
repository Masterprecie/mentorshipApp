import { useFormik } from "formik";
import { contactValidationSchema } from "../../../utils/validations";
import { ClipLoader } from "react-spinners";
import { alert } from "../../../utils/alert";
import { useContactMutation } from "../../../features/users/api";

const ContactUS = () => {
  const [contact, { isLoading }] = useContactMutation();

  const handleSubmitContact = (values) => {
    console.log(values);

    contact(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        resetForm();
        alert({
          type: "success",
          message: "Message Sent successfully",
          timer: 2000,
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
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values) => handleSubmitContact(values),
  });
  return (
    <div className="bg-contact bg-cover relative text-white py-16 px-5">
      <div className="absolute inset-0 bg-blue-900 opacity-80 z-20"></div>
      <div className="text-center z-20 text-white relative text-4xl font-bold pb-5 ">
        <p>Contact Us</p>
      </div>
      <div className="relative z-20 md:flex items-center gap-5 ">
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62283124574!2d3.28395955!3d6.548055099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1694735036411!5m2!1sen!2sng"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md w-full md:w-[350px] lg:w-[600px] h-[580px]"
          ></iframe>
        </div>
        <div className="w-full pt-5 md:pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* full name */}
            <div>
              <label
                htmlFor="fullName"
                className="text-sm  font-medium block pb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className=" text-black  border border-[#D0D5DD]  rounded-[8px] outline-0 w-full py-3 px-4"
              />
              {touched.fullName && errors.fullName && (
                <p className="text-red-500 font-semibold text-sm">
                  {errors.fullName}
                </p>
              )}
            </div>
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm  font-medium block pb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className=" text-black  border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 font-semibold text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            {/* phone number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="text-sm  font-medium block pb-2"
              >
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className=" text-black  border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="text-red-500 font-semibold text-sm">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="">
              <label
                htmlFor="message"
                className="text-sm  font-medium block pb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                cols="10"
                rows="7"
                placeholder="Message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className=" border border-[#D0D5DD] text-black rounded-[8px] outline-0 w-full py-3 px-4"
              />
              {touched.message && errors.message && (
                <p className="text-red-500 font-semibold text-sm">
                  {errors.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-200 p-3 text-black font-bold w-full rounded-md shadow-lg"
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
      </div>
    </div>
  );
};

export default ContactUS;
