import { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import GuestLayoutComponent from '../../components/pagelayouts/GuestLayoutComponent';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/core/PrimaryButton';
import { BiArrowBack } from 'react-icons/bi';
import TButton from '../../components/core/TButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { inputCss } from '../../components/css-components/text-field';

function Login() {
  // State variables
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // When the component unmounts, reset the password field
  useEffect(() => {
    return () => {
      setPassword('');
    };
  }, []);

  // Form submit handler for login
  const onSubmit = (ev) => {
    ev.preventDefault();
    setProcessing(true);

    axiosClient
      .post('/loginDataVerification', {
        phoneNumber,
        password,
      })
      .then((response) => {
        verifyPhone();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          //   console.log(error);
        }
        setProcessing(false);
      });
  };

  // Function to verify the phone number and navigate to the code verification page
  const verifyPhone = () => {
    try {
      axiosClient
        .post('/verify-phone', { phoneNumber })
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          }
          const status = 'login';
          const url = `/verify-code?phoneNumber=${phoneNumber}&password=${password}&status=${status}`;
          navigate(url);
        })
        .catch((error) => {
          //   console.log(error);
          if (error.response.data.errors) {
            setError(error.response.data.errors);
          }
          if (error.response.data.errorShow) {
            setError(error.response.data.errorShow);
          }
          setProcessing(false);
        });
    } catch (error) {
      //   console.log(error);
    }
  };

  return (
    <GuestLayoutComponent title={'Sign in to your account'}>
      <div>
        <form onSubmit={onSubmit} className="space-y-6">
          {/**Phone Number */}
          <div className="relative">
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              type="number" // Note: Changed type to "number"
              autoComplete="phoneNumber"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="Phone Number" // Add label
              variant="outlined" // Use outlined variant
              fullWidth // Use full width
              error={!!errors.phoneNumber} // Check if there are errors
              helperText={errors.phoneNumber ? errors.phoneNumber[0] : ''} // Display error message
              sx={inputCss}
            />
          </div>
          {/**Phone Number */}

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
              helperText={errors.password ? errors.password[0] : ''} // Display error message
              sx={inputCss}
            />
          </div>
          {/**Password */}

          <div className="text-sm flex justify-end">
            {/* Link to the forgot password page */}
            <Link to="/verify-phone" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center">
              {/* Submit Button */}
              <PrimaryButton disabled={processing}> {processing ? 'Signing in' : 'Sign in'} </PrimaryButton>
            </div>
          </div>
        </form>


      </div>
    </GuestLayoutComponent>
  );
}

export default Login;
