import { useState } from "react";
import ToggleSwitch from "../../../../components/toggle";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Security = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (checked) => {
    setIsActive(checked);
  };
  return (
    <div className="w-full md:w-1/2 space-y-8">
      {/* enable 2FA */}
      <div className="border rounded-2xl p-5 space-y-3 flex justify-between">
        <div>
          <h1 className="text-lg text-black font-semibold">
            Two-factor authentication
          </h1>
          <p className="text-sm text-gray-400">
            Set up your two-factor authentication to add an extra layer of
            protection to your account
          </p>
        </div>
        <div>
          <ToggleSwitch checked={isActive} onChange={handleToggle} />
        </div>
      </div>
      {/* change password */}
      <div
        onClick={() => navigate("/dashboard/settings/change-password")}
        className="border rounded-2xl p-5 space-y-3 flex justify-between"
      >
        <div>
          <h1 className="text-lg text-black font-semibold">Change Password</h1>
          <p className="text-sm text-gray-400">
            Click here to change your account&apos;s password
          </p>
        </div>
        <div>
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
      {/* change email */}
      <div
        onClick={() => navigate("/dashboard/settings/change-email")}
        className="border rounded-2xl p-5 space-y-3 flex justify-between"
      >
        <div>
          <h1 className="text-lg text-black font-semibold">Change Email</h1>
          <p className="text-sm text-gray-400">
            Click here to change your account&apos;s email
          </p>
        </div>
        <div>
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
};
export default Security;
