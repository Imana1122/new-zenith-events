import { useState } from "react";
import axiosClient from "../../axios";
import GuestLayoutComponent from "../../components/pagelayouts/GuestLayoutComponent";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/core/PrimaryButton";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ResetPassword() {
  // Get phone number and code from URL query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get('phoneNumber');
  const code = searchParams.get('code');

  // State variables
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Form submit handler for resetting password
  const submit = (e) => {
    e.preventDefault();
    setErrors("");
    setMessage("");
    setProcessing(true);

    axiosClient
      .put("/resetPassword", {
        phoneNumber: phoneNumber,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        setMessage(response.data.message);
        setProcessing(false);
        navigate('/login'); // Navigate to the login page after successful password reset
      })
      .catch((error) => {
        // console.log(error);
        setErrors(error.response.data.message || "An error occurred.");
        setProcessing(false);
      });
  };

  return (
    <GuestLayoutComponent title="Reset Password">
      <div className="mb-4 text-sm text-gray-600">
        This is the password reset field. Create a stronger password this time.
      </div>

      {message && <Typography variant="body2" className="mb-4 font-medium text-green-600">{message}</Typography>}

      <form onSubmit={submit} className="flex flex-col justify-center space-y-5">
        {/**Password */}
        <div className="relative">
          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password" // Add label
            variant="outlined" // Use outlined variant
            fullWidth // Use full width
            error={!!errors.password} // Check if there are errors
            helperText={errors.password ? errors.password : ''}
          />
        </div>
        {/**Password */}

        {/**Password Confirmation */}
        <div className="relative">
          <TextField
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="passwordConfirmation"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            label="Password Confirmation" // Add label
            variant="outlined" // Use outlined variant
            fullWidth // Use full width
            error={!!errors.passwordConfirmation} // Check if there are errors
            helperText={errors.passwordConfirmation ? errors.passwordConfirmation : ''}
          />
        </div>
        {/**Password Confirmation */}

        <div className="flex items-center justify-end mt-4">
          {/* Submit Button */}
          <PrimaryButton disabled={processing}>{processing ? 'Resetting' : 'Reset Password'}</PrimaryButton>
        </div>
      </form>
    </GuestLayoutComponent>
  );
}
