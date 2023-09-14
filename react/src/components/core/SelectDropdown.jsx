import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function SelectDropdown({
  options,
  label,
  zIndex,
  buttonClass,
  optionsClass,
  onChange,
  value,
  ...props
}) {
    // Use the "value" prop to set the initial selected option
    const [selected, setSelected] = useState(options[0]);




    // Function to handle option selection and call the "onChange" callback
    const handleOptionSelect = (selectedOption) => {
      setSelected(selectedOption);
      onChange(selectedOption.label); // Call the "onChange" callback with the selected label
    };

  return (
    <div className="relative" style={{ zIndex }}>
      <div className="relative mt-1">
        <Listbox value={selected}
          name={props.name}
          id={props.id}
          onChange={handleOptionSelect} // Call the "handleOptionSelect" function
          as="div" className="space-y-1">
          <div>
            <Listbox.Button

              className={`relative w-full cursor-default rounded-md border-2 py-2 pl-3 pr-10 border-gray-400 text-left shadow-md focus:outline-none focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${buttonClass}`}
              id={props.id}
            >
              <label
                htmlFor={props.id}
                className={`absolute left-3 -top-4 text-sm text-black bg-white px-1 pointer-events-none`}
              >
                {label}
              </label>
              <span className="truncate block text-black">{selected.label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className={`absolute mt-1 w-full py-1 text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${optionsClass}`}
            >
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  );
}
