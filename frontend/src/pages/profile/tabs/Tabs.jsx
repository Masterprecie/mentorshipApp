import { useState } from "react";
import PropTypes from "prop-types";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="bg-white rounded-lg w-full  py-[12px]">
        <div className="border-b mt-[24px] space-x-8 ">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`pb-3 inline-block text-sm font-medium ${
                activeTab === index
                  ? "border-b-2 border-[#004225] text-[#004225] font-semibold"
                  : "text-[#9E9E9E]"
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
  heading: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Tabs;
