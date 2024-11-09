import propTypes from "prop-types";
const ToggleSwitch = ({
  checked,
  onChange,
  size = "w-12 h-7",
  activeColor = "bg-green-400",
  inactiveColor = "bg-gray-400",
  label,
}) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center flex-row-reverse">
      {label && <span className="ml-3 text-sm text-black">{label}</span>}
      <label className="flex items-center gap-5  cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={handleToggle}
          />
          <div
            className={`block ${
              checked ? activeColor : inactiveColor
            } ${size} rounded-full`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition ${
              checked ? "transform translate-x-full bg-white" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

ToggleSwitch.propTypes = {
  checked: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  size: propTypes.string,
  activeColor: propTypes.string,
  inactiveColor: propTypes.string,
  label: propTypes.string,
};

export default ToggleSwitch;
