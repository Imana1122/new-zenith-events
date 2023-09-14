import React, { forwardRef, useEffect } from 'react';

const LabeledTextArea = forwardRef(
    ({ type , className = '', isfocused = false,error, ...props }, ref) => {
        const inputRef = ref || React.createRef();

        useEffect(() => {
            if (isfocused) {
                inputRef.current.focus();
            }
        }, []);

        return (
            <div className="relative">
                <textarea
                    {...props}
                    type={type}
                    className={`block w-full text-sm font-medium rounded-md border-2 border-gray-400 p-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none ${
                        error ? "border-red-500" : "focus:border-indigo-600"
                       } sm:text-sm sm:leading-6`}
                    ref={inputRef}
                />
                <label
                    htmlFor={props.id}
                    className={`absolute left-4 transition-all duration-300 pointer-events-none text-black ${
                        props.value ? `-top-3 text-sm text-blue-600 font-semibold bg-white` : 'top-1/2 -translate-y-1/2 bg-white px-1'}`}
                >
                    {props.label}
                </label>
            </div>
        );
    }
);

export default LabeledTextArea;
