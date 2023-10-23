import PropTypes from "prop-types";

const Input = function (props) {
  const { name, value, setValue, placeholder } = props;

  return (
    <input
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={setValue}
      className="flex p-2 rounded-xl border border-indigo-300 shadow-sm"
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired, // name should be a required string
  value: PropTypes.any, // value should be a required string
  placeholder: PropTypes.string,
  setValue: PropTypes.func.isRequired, // setValue should be a required function
};

export default Input;
