import PropTypes from "prop-types";

const Input = function (props) {
  const { name, value, className, setValue, placeholder } = props;

  return (
    <input
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={setValue}
      className={
        className
          ? className
          : "flex p-2 rounded-xl border border-indigo-300 dark:bg-gray-800 shadow-sm"
      }
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired, // name should be a required string
  value: PropTypes.any, // value should be a required string
  className: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func.isRequired, // setValue should be a required function
};

export default Input;
