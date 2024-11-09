import { useState } from "react";
import ToggleSwitch from "../../../../components/toggle";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Notifications = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (checked) => {
    setIsActive(checked);
  };
  return (
    <div className="w-full md:w-1/2 space-y-8">
      <div className="border rounded-2xl p-5 space-y-3 flex gap-5 justify-between">
        <div>
          <h1 className="text-lg text-black font-semibold">
            Notification Type
          </h1>
          <p className="text-sm text-gray-400">
            Receive notifications for various activities to engage and track
            your bookings
          </p>
        </div>
        <div className="space-y-3">
          <ToggleSwitch
            checked={isActive}
            onChange={handleToggle}
            label="Push"
          />
          <ToggleSwitch
            checked={isActive}
            onChange={handleToggle}
            label="Email"
          />
        </div>
      </div>
    </div>
  );
};
export default Notifications;
