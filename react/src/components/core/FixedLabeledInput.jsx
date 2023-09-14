import React, { forwardRef, useEffect } from 'react';


const FixedLabeledInput = forwardRef(({ type, className = '',isfocused=false, label,error, ...props }, ref) => {
  const inputRef = ref || React.createRef();
  useEffect(() => {
    if (isfocused) {
        inputRef.current.focus();
    }
}, []);

  return (
    <div className="relative">
      <label
        htmlFor={props.id}
        className="absolute left-3 -top-3 text-sm text-blue-600 bg-white px-1 pointer-events-none font-semibold"
      >
        {label}
      </label>
      <input
{...props}
        type={type}
        className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
           error ? "border-red-500" : "focus:border-indigo-600"
          } sm:text-sm sm:leading-6`}

        ref={inputRef}
      />
    </div>
  );
});

export default FixedLabeledInput;
