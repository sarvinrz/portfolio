import PropTypes from "prop-types";

const Select = function ({ name, value, options, setValue, loading }) {
  return (
    <select
      name={name}
      disabled={loading}
      value={value}
      onChange={setValue}
      className="flex p-2 rounded-xl border border-indigo-300 dark:bg-gray-800 shadow-sm"
    >
      <option value="">{!loading ? "Select..." : "Loading..."}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired, // name should be a required string
  loading: PropTypes.bool,
  options: PropTypes.array.isRequired,
  value: PropTypes.any, // value should be a required string
  setValue: PropTypes.func.isRequired, // setValue should be a required function
};

export default Select;
