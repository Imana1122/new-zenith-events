import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../axios';
import { toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import esewa from '../../assets/esewa.png';
import { Transition } from '@headlessui/react';
import { FaCheckCircle } from 'react-icons/fa';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { inputCss } from '../css-components/text-field';


const CustomerDetails = () => {

  const navigate = useNavigate();

  // Get the current user from local storage
  const currentUser = JSON.parse(localStorage.getItem('USER'));

  // Retrieve data from the Redux store
  const isAgreed = useSelector((state) => state.isAgreed.isAgreed);
  const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;
  const count = useSelector((state) => state.count.count);

  useEffect(() => {
    // If no event is selected, navigate back to the home page
    if (!selectedEvent) {
      navigate('/');
    }
  });

  // Calculate cart total, subtotal, VAT, and total
  const VAT = selectedEvent.vat;
  const subtotal = selectedEvent ? selectedEvent.price * count : 0;
  const VATAmount = subtotal * VAT/100;
  const total = subtotal + VATAmount;


  // Form state
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: 0,
    eventId: selectedEvent.id,
    noOfPeople: count,
    totalAmount: total,
    verificationStatus: false,
    bookOrderId: Date.now(),
  });

  const [isMobileVerified, setIsMobileVerified]= useState(false)
  const [isCodeVerified, setIsCodeVerified]= useState(false)

  // State for verification code
  const [verificationCode, setVerificationCode] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [codeSent, setCodeSent] = useState('');
  const [phoneVerifyError, setPhoneVerifyError] = useState({});
  const [codeVerifyError, setCodeVerifyError] = useState('');
  const [codeSentError, setCodeSentError] = useState({})
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);
  const [bookingError, setBookingError] = useState({})
  const [codeVerifySuccess, setCodeVerifySuccess]=useState('')


    // Timer setup and countdown effect
    useEffect(() => {
        if(!isMobileVerified){
            setSeconds(0)
        }
            setTimer();

      }, [seconds]);

  const setTimer = () => {
    if (seconds === 0) {
      // Clear the timer when seconds reach 60
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };


  // Function to show the success message temporarily
  const recentlySuccessfulModal = () => {
    setRecentlySuccessful(true);

    const timer = setTimeout(() => {
      setRecentlySuccessful(false);
      setCodeVerifyError('');
      setPhoneVerifyError({});
      setCodeSentError({})
      setCodeSent('');
      setBookingError({})
      setCodeVerifySuccess('')
    }, 2500); // Set the time (in milliseconds) to show the success message

    return () => clearTimeout(timer);
  };

  const mobileVerified = ()=>{

    setIsMobileVerified(true)
    if (!isCodeVerified ){
        const timer = setTimeout(()=>{
            setIsMobileVerified(false)
        },120000)
        return () => clearTimeout(timer);
    }
  }



  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};

// Handle verification code input changes
const handleVerificationCodeChange = (event) => {
  const { name, value } = event.target;
  setVerificationCode(value);
};

  // Send verification code to the user's phone number
  const sendVerificationCode = () => {
    const phone_number = parseInt(formData.phoneNumber, 10);
    axiosClient
      .post('/send-code', { phoneNumber: phone_number }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        setCodeSent(response.data.message);
        setSeconds(120)
        setTimer();
        recentlySuccessfulModal();
        mobileVerified();

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
          setPhoneVerifyError(error.response.data.error);
          setTimer();
          recentlySuccessfulModal();
        //   console.log(error)
        } else {
          // Handle other errors, such as network errors

          setPhoneVerifyError(error.response.data.errors)
          recentlySuccessfulModal()
        }
      });
  };

  // Create the booking
    const booking = (e) => {
        e.preventDefault();
        axiosClient
          .post(
            '/createBooking',
            {
              name: formData.name,
              address: formData.address,
              phoneNumber: formData.phoneNumber,
              eventId: formData.eventId,
              noOfPeople: formData.noOfPeople,
              totalAmount: formData.totalAmount,
              verificationStatus: formData.verificationStatus,
              bookOrderId: formData.bookOrderId,
            },
            { headers: { 'Content-Type': 'application/json' } }
          )
          .then((response) => {
            if (response.data.message === 'true') {
              try {
                navigate('/esewa', {
                  state: {
                    bookOrderId: formData.bookOrderId,
                    totalAmount: formData.totalAmount,
                    eventId: formData.eventId,
                  },
                });
              } catch (error) {
                // console.log(error)
              }
            }
          })
          .catch((error) => {
        //    console.log(error)
           setBookingError(error.response.data.errors)
           recentlySuccessfulModal()
          });
    };

  // Verify the entered code
    const verifyCode = (e) => {
        e.preventDefault();
        axiosClient
        .post(
            '/verify-code',
            { phoneNumber: formData.phoneNumber, verificationCode: verificationCode },
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
            setCodeVerifySuccess(response.data.message)
            recentlySuccessfulModal()
            if (response.data.message) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                verificationStatus: true,
            }));
            setIsCodeVerified(true)
            } else {
            setCodeVerifyError(response.data.error);
            setTimer();
            recentlySuccessfulModal();
            }


        })
        .catch((error) => {
            // console.log(error)
            setCodeSentError(error.response.data.errors)
            recentlySuccessfulModal()
        });
    };



    return (
        <div className="flex flex-col p-5 py-10  h-fit w-full md:border md:border-slate-800 md:border-opacity-50 m-auto rounded-lg md:w-full md:mb-5">
          <h2 className="text-2xl mb-4 text-purple-900 text-center">Enter Your Details</h2>
          <hr className="border-purple-900 md:my-2 mb-4" />
          <form className="flex flex-col mt-3" onSubmit={booking}>
          <div className="md:hidden flex justify-between items-start mb-4">
              <p>Total Payable</p> <p> NRs{total}</p>
            </div>
            {isMobileVerified && isCodeVerified ? (
              <>
                <div className="flex flex-col items-end w-full space-y-3">
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="standard"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isAgreed}
                    error={Boolean(bookingError.name)}
                    helperText={bookingError.name || ""}
                    sx={inputCss}
                  />
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    variant="standard"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isAgreed}
                    error={Boolean(bookingError.address)}
                    helperText={bookingError.address || ""}
                    sx={inputCss}
                  />
                  <div className="flex justify-between h-[50px] space-x-5 w-fit items-center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!isAgreed}
                    >
                        Proceed to Payment
                    </Button>
                    <img src={esewa} alt="esewa" className='w-fit h-full'/>
                  </div>
                </div>
              </>
            ) : (
              isMobileVerified ? (
                <div className="flex flex-col items-end w-full space-y-3">
                  <TextField
                    fullWidth
                    id="verificationCode"
                    name="verificationCode"
                    label="Verification Code"
                    variant="standard"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    disabled={!isAgreed}
                    error={Boolean(codeSentError.verificationCode || codeVerifyError || bookingError.verificationStatus)}
                    helperText={codeSentError.verificationCode || codeVerifyError || bookingError.verificationStatus || ""}
                    sx={inputCss}
                  />
                  {/* Success Message */}
                    <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                    >
                    <p className="text-sm text-green-800 flex justify-center space-x-5">
                        {codeSent && (
                        <span className="flex items-center">
                            {codeSent}
                            <FaCheckCircle className="text-xl font-bold" />
                        </span>
                        )}

                    </p>
                    </Transition>
                    {/* Success Message */}
                    <Transition
                      show={recentlySuccessful}
                      enterFrom="opacity-0"
                      leaveTo="opacity-0"
                      className="transition ease-in-out"
                    >
                      <p className="text-sm text-green-800 flex justify-center space-x-5">
                        {codeVerifySuccess && (
                          <span className="flex items-center">
                            {codeVerifySuccess}
                            <FaCheckCircle className="text-xl font-bold" />
                          </span>
                        )}

                      </p>

                    </Transition>
                    <div className="flex justify-between h-[50px] space-x-5 w-fit items-center">
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={!isAgreed}
                            onClick={verifyCode}
                        >
                           Verify Code
                        </Button>
                        <Button
                            color="secondary"
                            disabled={!isAgreed}
                            onClick={sendVerificationCode}
                        >
                           Resend
                        </Button>
                    </div>
                </div>


              ) : (
                <>
                  <div className="flex flex-col items-end w-full space-y-3">
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Mobile No"
                      variant="standard"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={!isAgreed}
                      error={Boolean(codeSentError.phoneNumber || phoneVerifyError.phoneNumber || bookingError.phoneNumber)}
                      helperText={codeSentError.phoneNumber || phoneVerifyError.phoneNumber || bookingError.phoneNumber || ""}
                      sx={inputCss}
                    />
                    <Button
                        variant='contained'
                        color="secondary"
                        disabled={!isAgreed}
                        onClick={sendVerificationCode}
                    >
                       Send Code
                    </Button>
                  </div>

                </>
              )
            )}
          </form>
        </div>
      );

};

export default CustomerDetails;
