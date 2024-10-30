import { useState } from "react";
import PropTypes from "prop-types";

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div>
      <div className="max-w-[230px] mx-auto">
        <div className=" bg-gray-300 flex justify-center rounded-[32px] px-3  py-[10px] space-x-4 ">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-5 inline-block text-sm font-medium ${
                activeTab === index
                  ? " bg-blue-900 rounded-[19px] text-white font-semibold"
                  : "text-black"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-[12px]">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  onTabChange: PropTypes.func,
};

export default Tabs;
