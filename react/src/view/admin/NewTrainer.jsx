import React, { useState, useEffect } from "react";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import { PhotoIcon } from "@heroicons/react/24/outline";
import TButton from "../../components/core/TButton";
import { toast } from "react-hot-toast";
import axiosClient from "../../axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../../utility/ImageToBase64";
import InputError from "../../components/core/InputError";
import API_BASE_URL from "../../apiConfig";
import TextField from "@mui/material/TextField";
import { inputCss } from "../../components/css-components/text-field";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from "@mui/material";

export const NewTrainer = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  // State variable to determine the mode (update or create)
  const [mode, setMode] = useState(trainerId ? "update" : "create");
  const [errors, setErrors] = useState({});
  const post = [
    { value: "Laravel Coach", label: "Laravel Coach" },
    { value: "React Coach", label: "React Coach" },
  ];

  // State variable to store trainer information
  const [trainer, setTrainer] = useState({
    name: "",
    post: post[0].label,
    skillLevel: "",
    experienceYears: "",
    imagePath: "",
    image: null,
  });

  useEffect(() => {
    // Fetch existing trainer data if in update mode and trainerId is provided
    if (trainerId && mode === "update") {
      axiosClient
        .get(`/trainers/${trainerId}`)
        .then((response) => {
          setTrainer(response.data.trainer);
          setImageUrl(
            API_BASE_URL +
              "/storage/images/trainers/" +
              response.data.trainer.imagePath
          );
        })
        .catch((error) => {
          // Handle the error
        });
    }
  }, [trainerId, mode]);

  // Function to handle image upload
  const uploadImage = async (e) => {
    const imageUrl = await ImageToBase64(e.target.files[0]);
    setImageUrl(imageUrl);

    // Update the form data state with the file object
    setTrainer((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  useEffect(() => {
    console.log(trainer);
  });

  useEffect(() => {
    setErrors({});
  }, [trainer.imagePath]);

  // Function to handle form submission
  const onSubmit = (ev) => {
    ev.preventDefault();

    // Determine the request URL and method based on the mode (update or create)
    const requestUrl = trainerId ? `/updateTrainer/${trainerId}` : "/createTrainer";
    const requestMethod = "POST";
    console.log(requestMethod, requestUrl);

    axiosClient
      .request({
        url: requestUrl,
        method: requestMethod,
        data: trainer,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        toast.success(data.message);
        navigate("/trainers");
      })
      .catch((error) => {
        // Handle the error
        if (error.response && error.response.data && error.response.data.errors) {
          console.log(error);
          setErrors(error.response.data.errors);
        } else {
          console.log(error);
        }
      });
  };

  const handleChange = (field, value) => {
    // Update the form data state
    setTrainer((prev) => ({
      ...prev,
      [field]: value === null || value === undefined ? "" : value,
    }));
  };


  const styles = theme => ({
    label: {
       text:'black',
    },
    input: {
        color: 'white',
        border:'black'
    }
});


  return (
    <PageComponent title={mode === "update" ? "Edit Trainer" : "Add New Trainer"}>
      <div className="md:mx-10 m-auto">
        <form onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md md:p-10 rounded-lg">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="imagePath">
                  Photo
                </label>
                <div className="mt-1 flex flex-col items-start space-y-3">
                  {trainer.image || trainer.imagePath ? (
                    <img src={imageUrl} alt="trainer" className="w-1/2 object-cover rounded-lg" />
                  ) : (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-full h-full" />
                    </span>
                  )}
                  <div>

                    <Button
                      variant="outlined"
                      component="label"
                      className="relative rounded-md border border-gray-400 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      startIcon={<CloudUploadIcon />}
                    >

                      <input
                        type="file"
                        className="absolute text-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                        onChange={uploadImage}
                      />
                      Change
                    </Button>
                    <InputError message={errors.image} className="mt-2" />
                    <InputError message={errors.imagePath} className="mt-2" />
                  </div>
                </div>
              </div>
              {/* Image */}

              {/* Name */}
              <div>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={trainer.name}
                  error={Boolean(errors.name)}
                  helperText={errors.name || " "}
                  onChange={(e) => handleChange("name", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Name */}

              {/* Post */}
              <div>
              <TextField
                id="post"
                name="post"
                label="Post"
                variant="outlined"
                fullWidth
                required
                value={trainer.post}
                error={Boolean(errors.post)}
                helperText={errors.post || " "}
                onChange={(e) => handleChange("post", e.target.value)}
                sx={ inputCss }
                />

              </div>
              {/* Post */}

              {/* Skill Level */}
              <div>
                <TextField
                  id="skillLevel"
                  name="skillLevel"
                  label="Skill Level"
                  variant="outlined"
                  fullWidth
                  required
                  value={trainer.skillLevel}
                  error={Boolean(errors.skillLevel)}
                  helperText={errors.skillLevel || " "}
                  onChange={(e) => handleChange("skillLevel", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Skill Level */}

              {/* Experience Years */}
              <div>
                <TextField
                  id="experienceYears"
                  name="experienceYears"
                  label="Experience Years"
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  value={trainer.experienceYears}
                  error={Boolean(errors.experienceYears)}
                  helperText={errors.experienceYears || " "}
                  onChange={(e) => handleChange("experienceYears", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Experience Years */}
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              {mode === "update" ? (
                <TButton type="submit">Update</TButton>
              ) : (
                <TButton type="submit">Save</TButton>
              )}
            </div>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};
