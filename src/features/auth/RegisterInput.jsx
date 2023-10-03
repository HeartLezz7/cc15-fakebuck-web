export default function RegisterInput({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  hasError,
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`block w-full border rounded-md outline-none px-3 py-1.5 text-sm focus:ring 
      ${
        hasError
          ? "border_red-500 focus:ring-red-300"
          : "focus:ring-blue-300 focus:border-blue-500 border-gray-300 "
      }
      `}
      value={value}
      onChange={onChange}
    />
  );
}
