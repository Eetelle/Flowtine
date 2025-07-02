export function Input({ placeholder, value, onChange }) {
    return (
      <input
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
  