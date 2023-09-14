import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import PrimaryButton from '../../../components/core/PrimaryButton';
import axiosClient from '../../../axios';
import { FaCheckCircle } from 'react-icons/fa';
import { useStateContext } from '../../../contents/ContextProvider';
import { superadmin } from '../../../superadmin';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function UpdateProfileInformation({ fullName, userPhoneNumber, className = '' }) {
  // State variables to manage form inputs and status
  const [name, setName] = useState(fullName);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const { currentUser } = useStateContext();

  // Function to show the success message temporarily
  const recentlySuccessfulModal = () => {
    setRecentlySuccessful(true);

    const timer = setTimeout(() => {
      setRecentlySuccessful(false);
    }, 2000); // Set the time (in milliseconds) to show the success message

    return () => clearTimeout(timer);
  };

  // Function to handle form submission
  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);

    axiosClient
      .put('/updateProfile', {
        name: name,
        phoneNumber: phoneNumber
      })
      .then((response) => {
        setProcessing(false);
        if (response.data.error) {
          setError(response.data.error);
        }
        setErrors({});
        if (response.data.message) {
          recentlySuccessfulModal();
        }
      })
      .catch((error) => {
        setProcessing(false);
        // console.log(error);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <section className={className}>
      <header>
        <Typography variant="h6" className="text-gray-900">Profile Information</Typography>

        <Typography variant="body2" className="mt-1 text-gray-600">
          Update your account's profile information and email address.
          {error && <Typography variant="body2" className='text-red-500'>{error}</Typography>}
        </Typography>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        {/* Name */}
        <div className="relative">
          <TextField
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? errors.name[0] : ''}
          />
        </div>

        {/* Phone Number */}
        <div className="relative">
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            required
            value={phoneNumber}
            readOnly={currentUser.phoneNumber === superadmin} // Set readOnly conditionally
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Phone Number"
            variant="outlined"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber ? errors.phoneNumber[0] : ''}
          />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          {/* Success Message */}
          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <Typography variant="body2" className="text-green-800 flex justify-center space-x-5">
              Saved.<FaCheckCircle />
            </Typography>
          </Transition>
        </div>
      </form>
    </section>
  );
}
