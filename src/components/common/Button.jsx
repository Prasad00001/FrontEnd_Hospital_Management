import React from 'react';

const Button = ({ children, type = "button", onClick, variant = "primary", isLoading = false, fullWidth = false }) => {
  const baseStyles = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const opacityClass = isLoading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${opacityClass}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};

export default Button;