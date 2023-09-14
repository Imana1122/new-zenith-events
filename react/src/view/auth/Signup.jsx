import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios";
import PrimaryButton from "../../components/core/PrimaryButton";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TextField from "@mui/material/TextField";
import { inputCss } from "../../components/css-components/text-field";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setProcessing(true);
    setErrors({});

    axiosClient
      .post("/signupDataVerification", {
        name: fullName,
        phoneNumber,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        verifyPhone();
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          //   console.log(error);
        }
      });
  };

  const verifyPhone = () => {
    try {
      axiosClient
        .post("/signupPhoneNumberVerification", { phoneNumber })
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          }
          const status = "signup";
          const url = `/verify-code-register?fullName=${fullName}&phoneNumber=${phoneNumber}&password=${password}&passwordConfirmation=${passwordConfirmation}&status=${status}`;
          navigate(url);
        })
        .catch((error) => {
          // console.log(error)
          if (error.response.data.errors) {
            setError(error.response.data.errors);
          }
          if (error.response.data.errorShow) {
            setError(error.response.data.errorShow);
          }
          setProcessing(false);
        });
    } catch (error) {
      // console.log(error)
    }
  };

  return (
    <PageComponent title="Add new User">
      <div>
        {error && <div className="mb-4 font-medium text-sm text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          {/**Name */}
          <TextField
            id="full-name"
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name && errors.name[0]}
            sx={inputCss}
          />

          {/**Phone Number */}
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            required
            type="Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber[0]}
            sx={inputCss}
          />

          {/**Password */}
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password && errors.password[0]}
            sx={inputCss}
          />

          {/**Confirm Password */}
          <TextField
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Password Confirmation"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation && errors.passwordConfirmation[0]}
            sx={inputCss}
          />

          <div className="flex items-start">
            <PrimaryButton disabled={processing}>{processing ? "ADDING" : "ADD"}</PrimaryButton>
          </div>
        </form>

        <div></div>
      </div>
    </PageComponent>
  );
}
