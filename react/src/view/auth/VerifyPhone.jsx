import { useState } from "react";
import axiosClient from "../../axios";
import GuestLayoutComponent from "../../components/pagelayouts/GuestLayoutComponent";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/core/PrimaryButton";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function VerifyPhone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    // Send a request to verify the phone number
    axiosClient.post('/verify-phone', { phoneNumber })
      .then((response) => {
        setMessage(response.data.message);
        setError(response.data.error)
        setProcessing(false)

        // If the verification is successful, navigate to the next step
        const status = 'reset-password';
        const url = `/verify-code?phoneNumber=${phoneNumber}&status=${status}`;
        navigate(url);
      })
      .catch((error) => {
        // console.log(error)

        // Handle errors and display error messages if any
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
        if (error.response.data.errorShow) {
          setError(error.response.data.errorShow)
        }

        setProcessing(false);
      });
  };

  return (
    <GuestLayoutComponent title="Forgot Password">
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your phoneNumber and we will verify your phone number
        and give you a password reset field that will allow you to choose a new one.
      </div>

      {/* Display success message if available */}
      {message && <Typography variant="body2" className="mb-4 font-medium text-green-600">{message}</Typography>}

      {/* Display error message if available */}
      {error && <Typography variant="body2" className="mb-4 font-medium text-red-600">{error}</Typography>}

      <form onSubmit={submit}>
        {/* Phone Number */}
        <div className="relative">
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            type="Number"
            autoComplete="phoneNumber"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Phone Number" // Add label
            variant="outlined" // Use outlined variant
            fullWidth // Use full width
            error={!!errors.phoneNumber} // Check if there are errors
            helperText={errors.phoneNumber ? errors.phoneNumber : ''}
          />
        </div>
        {/* Phone Number */}

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton disabled={processing}> {processing ? 'Verifying' : 'Verify'} </PrimaryButton>
        </div>
      </form>
    </GuestLayoutComponent>
  );
}
