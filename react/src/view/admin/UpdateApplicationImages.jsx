import React, { useState, useEffect } from "react";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { toast } from "react-hot-toast";
import axiosClient from "../../axios";
import { useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../../utility/ImageToBase64";
import InputError from "../../components/core/InputError";
import API_BASE_URL from "../../apiConfig";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const UpdateApplicationImages = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  // State variable to store applicationImage information
  const [applicationImage, setApplicationImage] = useState({
    logo: null,
    background_image: null,
  });

  useEffect(() => {
    axiosClient
      .get(`/get-application-details`)
      .then((response) => {
        setApplicationImage(response.data.application_detail);
        setLogoUrl(API_BASE_URL + '/storage/images/application/' + response.data.application_detail.logo);
        setImageUrl(API_BASE_URL + '/storage/images/application/' + response.data.application_detail.background_image);
      })
      .catch((error) => {
        // Handle the error
      });

  }, []);

  // Function to handle form submission
  const onSubmit = (ev) => {
    ev.preventDefault();

    const requestUrl = "/update-application-details";
    const requestMethod = "POST";

    const formData = new FormData();
    formData.append("logo", applicationImage.logo);
    formData.append("background_image", applicationImage.background_image);

    axiosClient
      .request({
        url: requestUrl,
        method: requestMethod,
        data: formData,
      })
      .then(({ data }) => {
        toast.success(data.message);
        navigate("/application-images");
      })
      .catch((error) => {
        // Handle the error
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          // Handle other errors
        }
      });
  };

  const uploadLogo = async (e) => {
    const imageUrl = await ImageToBase64(e.target.files[0]);
    setLogoUrl(imageUrl);

    // Update the form data state with the file object
    setApplicationImage((prevData) => ({
      ...prevData,
      logo: e.target.files[0],
    }));
  };

  const uploadImage = async (e) => {
    const imageUrl = await ImageToBase64(e.target.files[0]);
    setImageUrl(imageUrl);

    // Update the form data state with the file object
    setApplicationImage((prevData) => ({
      ...prevData,
      background_image: e.target.files[0],
    }));
  };

  return (
    <PageComponent title="Edit Application Images">
      <div className="md:mx-10 m-auto">
        <form onSubmit={onSubmit}>
          <Card variant="outlined">
            <CardContent>
              <div className="flex flex-col space-y-5">
                {/* Logo */}
              <div>
                <Typography variant="h6">Logo</Typography>
                <div className="mt-2 flex flex-col items-start space-y-5">
                  {applicationImage.logo ? (
                    <img src={logoUrl} alt="logo" className="w-1/2 object-cover rounded-lg" />
                  ) : (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-full h-full" />
                    </span>
                  )}

                    <Button
                      variant="outlined"
                      component="label"
                      className="relative rounded-md border border-gray-400 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      startIcon={<CloudUploadIcon />}
                    >

                      <input
                        type="file"
                        accept="image"
                        className="absolute text-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                        onChange={uploadLogo}
                      />
                      Change
                    </Button>
                  <InputError message={errors.logo} className="mt-2" />
                </div>
              </div>
              {/* Logo */}

              {/* Background Image */}
              <div>
                <Typography variant="h6">Background Image</Typography>
                <div className="mt-2 flex flex-col items-start space-y-3">
                  {applicationImage.background_image ? (
                    <img src={imageUrl} alt="background" className="w-1/2 object-cover rounded-lg" />
                  ) : (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-full h-full" />
                    </span>
                  )}

                    <Button
                      variant="outlined"
                      component="label"
                      className="relative rounded-md border border-gray-400 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      startIcon={<CloudUploadIcon />}
                    >

                      <input
                        type="file"
                        accept="image"
                        className="absolute text-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                        onChange={uploadImage}
                      />
                      Change
                    </Button>
                  <InputError message={errors.background_image} className="mt-2" />
                </div>
              </div>
              {/* Background Image */}
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};
