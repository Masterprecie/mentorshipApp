import PropTypes from "prop-types";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#00D0E4"
      : state.isFocused
      ? "#f5f8fa"
      : null,
    color: state.isSelected ? "#fff" : "#333",
    padding: 10,
    outline: "none",
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 8,
    border: 1,
    "&:hover": {
      borderColor: "#D0D5DD",
    },
    minHeight: 48,
    backgroundColor: "#ffffff",
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
    borderColor: state.isFocused ? "none" : provided.borderColor,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#6B7280",
    color: "#fff",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#00D0E4",
    },
  }),
};

export const PrimaryMultiSelect = ({ options, value, onChange, onBlur }) => {
  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  return (
    <div>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={(selected) => {
          // Call onChange with array of selected values
          onChange(selected ? selected.map((option) => option.value) : []);
        }}
        onBlur={onBlur}
        className="border border-[#D0D5DD] rounded-[8px] outline-0 w-full"
        classNamePrefix="select"
        styles={customStyles}
      />
    </div>
  );
};

PrimaryMultiSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};
