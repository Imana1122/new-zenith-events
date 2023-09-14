import React, { useState, useEffect } from "react";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TButton from "../../components/core/TButton";
import { toast } from "react-hot-toast";
import axiosClient from "../../axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { inputCss } from "../../components/css-components/text-field";

export const UpdateContactDetails = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

// State variable to store contactDetails information
  const [contactDetails, setContactDetails] = useState({
    phone: 0,
    email: "",
    location: "",
    facebook_link: "",
    twitter_link: "",
    youtube_link: "",
    instagram_link: "",
    github_link: "",
    tiktok_link: "",
    allow_send_message: 0,
  });

  useEffect(() => {
      axiosClient
        .get(`/get-contact-details`)
        .then((response) => {
            setContactDetails(response.data.contactupdate);

        })
        .catch((error) => {
          // Handle the error
        });

  }, []);



  // Function to handle form submission
  const onSubmit = (ev) => {
    ev.preventDefault();

    const requestUrl =  "/update-contact-details";
    const requestMethod = "PUT"

    axiosClient
      .request({
        url: requestUrl,
        method: requestMethod,
        data: contactDetails,
      })
      .then(({data}) => {
        toast.success(data.message);
        navigate("/contact-details");
      })
      .catch((error) => {
        // Handle the error
        if (error.response && error.response.data && error.response.data.errors) {
        //   console.log(error);
          setErrors(error.response.data.errors);
        } else {
        //   console.log(error);
        }
      });
  };

  const handleChange = (field, value) => {
    // Update the form data state
    setContactDetails((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleAllowSendMessage = () => {
    // Toggle the value of allow_send_message
    setContactDetails((prev) => ({
      ...prev,
      allow_send_message: !prev.allow_send_message,
    }));
  };

  useEffect(()=>{
  console.log(contactDetails)
  },[contactDetails])



  return (
    <PageComponent title="Edit Contact Details" >
      <div className="md:mx-10 m-auto">
        <form
          onSubmit={onSubmit}
        >
          <div className="shadow sm:overflow-hidden sm:rounded-md md:p-10 rounded-lg">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">


              {/* Phone */}
              <TextField
                  id="phone"
                  name="phone"
                  type="number"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  required
                  value={contactDetails.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={!!errors.phone} // Set error if the field has an error
                  helperText={errors.phone} // Display error message
                  sx={ inputCss }
                />
              {/* Phone */}

              {/* Email */}
              <div>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={contactDetails.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={ inputCss }
                />
              </div>
              {/* Email */}

              {/*Location */}
              <div>
                <TextField
                  id="location"
                  name="location"
                  type="text"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  required
                  value={contactDetails.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  error={!!errors.location}
                  helperText={errors.location}
                  sx={ inputCss }
                />
              </div>
              {/* Location */}


              {/* Facebook Link */}
              <div>
                <TextField
                    id="facebook_link"
                    name="facebook_link"
                    type="url"
                    label="Facebook link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contactDetails.facebook_link}
                    onChange={(e) => handleChange("facebook_link", e.target.value)}
                    error={!!errors.facebook_link}
                    helperText={errors.facebook_link}
                    sx={ inputCss }
                />
                </div>

                {/* Instagram Link */}
                <div>
                <TextField
                    id="instagram_link"
                    name="instagram_link"
                    type="url"
                    label="Instagram link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contactDetails.instagram_link}
                    onChange={(e) => handleChange("instagram_link", e.target.value)}
                    error={!!errors.instagram_link}
                    helperText={errors.instagram_link}
                    sx={ inputCss }
                />
                </div>

                {/* Twitter Link */}
                <div>
                <TextField
                    id="twitter_link"
                    name="twitter_link"
                    type="url"
                    label="Twitter link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contactDetails.twitter_link}
                    onChange={(e) => handleChange("twitter_link", e.target.value)}
                    error={!!errors.twitter_link}
                    helperText={errors.twitter_link}
                    sx={ inputCss }
                />
                </div>

                {/* Youtube Link */}
                <div>
                <TextField
                    id="youtube_link"
                    name="youtube_link"
                    type="url"
                    label="Youtube link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contactDetails.youtube_link}
                    onChange={(e) => handleChange("youtube_link", e.target.value)}
                    error={!!errors.youtube_link}
                    helperText={errors.youtube_link}
                    sx={ inputCss }
                />
                </div>

                {/* Tiktok Link */}
                <div>
                <TextField
                    id="tiktok_link"
                    name="tiktok_link"
                    type="url"
                    label="Tiktok link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contactDetails.tiktok_link}
                    onChange={(e) => handleChange("tiktok_link", e.target.value)}
                    error={!!errors.tiktok_link}
                    helperText={errors.tiktok_link}
                    sx={ inputCss }
                />
                </div>

                {/* Github Link */}
                <div>
                <TextField
                    id="github_link"
                    name="github_link"
                    type="url"
                    label="Github link"
                    variant="outlined"
                    fullWidth
                    placeholder=" "
                    value={contactDetails.github_link}
                    onChange={(e) => handleChange("github_link", e.target.value)}
                    error={!!errors.github_link}
                    helperText={errors.github_link}
                    sx={ inputCss }
                />
                </div>


              <div>
                <label htmlFor="allow_send_message" className="flex items-center">
                  Allow Send Message
                  <Checkbox
                    id="allow_send_message"
                    name="allow_send_message"
                    checked={contactDetails.allow_send_message === "1" || contactDetails.allow_send_message === true}
                    onChange={toggleAllowSendMessage}
                    sx={ inputCss }
                  />
                </label>
              </div>


            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">

                  <TButton type="submit">Update</TButton>


            </div>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};
