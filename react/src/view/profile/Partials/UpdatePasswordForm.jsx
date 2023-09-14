import { Transition } from '@headlessui/react';
import PrimaryButton from '../../../components/core/PrimaryButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios';
import { FaCheckCircle } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// UpdatePasswordForm component
export default function UpdatePasswordForm({ className = '' }) {
    // State variables
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState("");
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    // Function to show the "Saved" message and clear it after a timeout
    const recentlySuccessfulModal = () => {
        setRecentlySuccessful(true);

        const timer = setTimeout(() => {
            setRecentlySuccessful(false);
        }, 2000); // Set the time (in milliseconds) to show the success message
        return () => clearTimeout(timer);
    };

    // Using the react-router-dom's useNavigate hook to navigate to other pages
    const navigate = useNavigate();

    // Function to update the user's password
    const updatePassword = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Sending PUT request to the server to update the password
        axiosClient.put('/updatePassword', {
            currentPassword: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation
        }).then((response) => {
            if (response.data.message) {
                setErrors({});
                setError("");
                recentlySuccessfulModal();
            }
            if (response.data.error) {
                setError(response.data.error);
            }
        }).catch((error) => {
            setErrors(error.response.data.errors);
        }).finally(() => {
            setProcessing(false);
        });
    };

    return (
        <section className={className}>
            <header>
                <Typography variant="h6" className="text-gray-900">Update Password</Typography>
                <Typography variant="body2" className="mt-1 text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </Typography>
                {error && <Typography variant="body2" className='text-red-500'>{error}</Typography>}
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                {/* Current Password */}
                <div className="relative">
                    <TextField
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        autoComplete="currentPassword"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        label="Current Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword ? errors.currentPassword : ''}
                    />
                </div>
                {/* Current Password */}

                {/* Password */}
                <div className="relative">
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password ? errors.password : ''}
                    />
                </div>
                {/* Password */}

                {/* Password Confirmation */}
                <div className="relative">
                    <TextField
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        autoComplete="passwordConfirmation"
                        required
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        label="Password Confirmation"
                        variant="outlined"
                        fullWidth
                        error={!!errors.passwordConfirmation}
                        helperText={errors.passwordConfirmation ? errors.passwordConfirmation : ''}
                    />
                </div>
                {/* Password Confirmation */}

                <div className="flex items-center gap-4">
                    {/* Button to update password */}
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    {/* Success message */}
                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <Typography variant="body2" className="text-green-600 flex space-x-5">Saved. <FaCheckCircle/></Typography>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
