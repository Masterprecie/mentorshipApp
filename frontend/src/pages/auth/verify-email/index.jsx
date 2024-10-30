import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// import Logo from "assets/svg/logo.svg?react";
import { ClipLoader } from "react-spinners";

import { alert } from "../../../utils/alert";
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "../../../features/auth/api";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(["", "", "", "", "", ""]);
  const [activeTokenIndex, setActiveTokenIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const tokenRefs = useRef([]);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("email");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  useEffect(() => {
    let intervalId;
    if (timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleTokenChange = (index, value) => {
    const newTokens = [...tokens];
    newTokens[index] = value;
    setTokens(newTokens);
  };

  const handleTokenInput = (e, index) => {
    const { value } = e.target;
    handleTokenChange(index, value);

    // Move to the next input field if a digit is entered
    if (value.length === 1 && index < 5) {
      setActiveTokenIndex(index + 1);
      tokenRefs.current[index + 1].focus();
    }

    // Move to the previous input field if backspace is pressed
    if (value.length === 0 && index > 0) {
      setActiveTokenIndex(index - 1);
    }
  };
  const allTokensFilled = tokens.every((token) => token.trim() !== "");
  const [getOtp] = useResendOtpMutation();

  const handleResend = async (e) => {
    e.preventDefault();
    console.log("resend", userEmail);

    getOtp({ email: userEmail })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          setErrorMessage(
            res.error.response?.data?.message || "An error occurred"
          );
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: res?.message || "Email verified successfully",
          timer: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const handleVerify = () => {
    setErrorMessage("");
    const payload = {
      otp: tokens.join(""),
      email: userEmail,
    };

    console.log(payload);
    verifyEmail(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          setErrorMessage(
            res.error.response?.data?.message || "An error occurred"
          );
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: res?.message || "Email verified successfully",
          timer: 1000,
          cb: () => navigate(`/login`),
        });
        setTokens(["", "", "", "", "", ""]);
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

  return (
    <div className="relative  px-5">
      <div className="flex flex-col justify-center h-screen">
        <div className="relative lg:w-1/2 mx-auto p-10 my-10 lg:mt-0 rounded  bg-white flex flex-col justify-center items-center">
          <h2 className="font-semibold text-xl lg:text-[32px] mt-3">
            Enter verification code
          </h2>
          <p className="text-base text-center py-4">
            Kindly input the code sent to your registered email{" "}
            <span className="font-semibold text-black">{userEmail}</span>{" "}
          </p>

          <p className="pb-2">
            The code expires in {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60} mins
          </p>

          {errorMessage && (
            <div
              className="bg-red-100 text-center capitalize border-l-4 border-red-500 text-red-700 px-4 py-2 mb-5"
              role="alert"
            >
              {errorMessage}!!!
            </div>
          )}

          {/* Code Verification Section */}
          <div className="mb-4">
            <div className="flex gap-3">
              {tokens.map((token, index) => (
                <input
                  type="text"
                  key={index}
                  maxLength="1"
                  value={token}
                  onChange={(e) => handleTokenInput(e, index)}
                  className={
                    index === activeTokenIndex
                      ? "active-input border w-10 h-10 outline-1 pl-3"
                      : "border w-10 h-10 outline-0  pl-3"
                  }
                  ref={(el) => (tokenRefs.current[index] = el)}
                />
              ))}
            </div>
          </div>

          {/* Verify Code Button */}
          <button
            type="submit"
            className={`w-[150px]  py-2 px-5 my-3 text-[#FAFAFA] font-bold text-lg ${
              !allTokensFilled ? "bg-blue-200" : "bg-blue-900"
            }`}
            onClick={handleVerify}
            disabled={!allTokensFilled}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" loading={true} size={15} />
            ) : (
              "Verify Code"
            )}
          </button>

          <p className="text-center pt-3 text-[#696363] text-sm">
            Didn’t receive the email?{" "}
            <span
              onClick={handleResend}
              className="text-[#007BFF] font-semibold"
            >
              Click to resend{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

VerifyEmail.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onVerify: PropTypes.func,
  email: PropTypes.string,
};

export default VerifyEmail;
