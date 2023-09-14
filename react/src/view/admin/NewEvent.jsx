import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import { ImageToBase64 } from "../../utility/ImageToBase64";
import InputError from "../../components/core/InputError";
import API_BASE_URL from "../../apiConfig";
import { inputCss } from "../../components/css-components/text-field";
import { Checkbox, FormControlLabel } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const NewEvent = () => {
  // Get the eventId from the URL using React Router's useParams hook
  const { eventId } = useParams();
  const navigate = useNavigate();

  // State variables for mode, event data, trainers, and selectedTrainers
  const [mode, setMode] = useState(eventId ? "update" : "create");
  const [trainers, setTrainers] = useState([]);
  const [errors, setErrors] = useState({});
  const workshopOptions = [
    { value: "Laravel Workshop", label: "Laravel Workshop" },
    { value: "React Workshop", label: "React Workshop" },
  ];
  const [event, setEvent] = useState({
    title: "",
    workshop: workshopOptions[0].value,
    start_date: null,
    end_date: null,
    imagePath: "",
    price: "",
    description: "",
    address: "",
    eventHostDetails: "",
    image: null,
    vat: 0,
  });
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  // Handle checkbox change for selecting trainers
  const handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const isChecked = e.target.checked;

    setSelectedTrainers((prevSelectedTrainers) =>
      isChecked
        ? [...prevSelectedTrainers, checkboxName]
        : prevSelectedTrainers.filter((name) => name !== checkboxName)
    );
  };

  // Fetch event data and trainers when the component mounts or when eventId changes
  useEffect(() => {
    if (eventId && mode === "update") {
      axiosClient
        .get(`/events/${eventId}`)
        .then((response) => {
          setEvent(response.data.event);

          // Create an array of trainer IDs associated with the event
          const selectedTrainerIds = response.data.event.trainers.map(
            (trainer) => trainer.id.toString()
          );

          // Set selectedTrainers state based on fetched event data
          setSelectedTrainers(selectedTrainerIds);
          setImageUrl(
            API_BASE_URL + "/storage/images/events/" + response.data.event.imagePath
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [eventId, mode]);

  // Fetch all trainers when the component mounts
  useEffect(() => {
    axiosClient
      .get("/allTrainers")
      .then((response) => {
        setTrainers(response.data.trainers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to handle image upload
  const uploadImage = async (e) => {
    const imageUrl = await ImageToBase64(e.target.files[0]);
    setImageUrl(imageUrl);

    // Update the form data state with the file object
    setEvent((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const onSubmit = (ev) => {
    ev.preventDefault();

    const requestUrl = eventId ? `/updateEvent/${eventId}` : "/createEvent";
    const requestMethod = "POST";

    axiosClient
      .request({
        url: requestUrl,
        method: requestMethod,
        data: {
          title: event.title,
          workshop: event.workshop,
          start_date: event.start_date,
          end_date: event.end_date,
          imagePath: event.imagePath,
          price: event.price,
          description: event.description,
          address: event.address,
          selectedTrainers: selectedTrainers,
          eventHostDetails: event.eventHostDetails,
          image: event.image,
          vat: event.vat,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        toast.success(data.message);
        navigate("/events");
      })
      .catch((error) => {
        // Handle the error
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  // Handle input changes for the event form
  const handleInputChange = (field, value) => {
    // Update the form data state
    setEvent((prev) => ({
      ...prev,
      [field]: value === null || value === undefined ? "" : value,
    }));
  };

  return (
    <PageComponent title={mode === "update" ? "Edit Event" : "Add New Event"}>
      <div className="md:mx-10 m-auto">
        <form
          action={mode === "update" ? `/updateEvent/${eventId}` : "/createEvent"}
          method="POST"
          onSubmit={onSubmit}
        >
          <div className="shadow sm:overflow-hidden sm:rounded-md md:p-10 rounded-lg ">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="imagePath">
                  Photo
                </label>
                <div className="mt-1 flex flex-col items-start">
                  {event.image || event.imagePath ? (
                    <img
                      src={imageUrl}
                      alt="event"
                      className="w-1/2 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-full h-full" />
                    </span>
                  )}
                  <div>
                    {event.imagePath && <p>{event.imagePath.length} length: must not be more than 2048</p>}

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

              {/* Workshop */}
              <div>
                <TextField
                  fullWidth
                  label="Event Workshop"
                  variant="outlined"
                  name="workshop"
                  value={event.workshop}
                  error={!!errors.workshop}
                  helperText={errors.workshop || " "}
                  onChange={(e) => handleInputChange("workshop", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Workshop */}

              {/* Title */}
              <div>
                <TextField
                  fullWidth
                  label="Event Title"
                  variant="outlined"
                  name="title"
                  value={event.title}
                  error={!!errors.title}
                  helperText={errors.title || " "}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Title */}

              {/* Address */}
              <div>
                <TextField
                  fullWidth
                  label="Event Address"
                  variant="outlined"
                  name="address"
                  value={event.address}
                  error={!!errors.address}
                  helperText={errors.address || " "}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Address */}

              {/* Price */}
              <div>
                <TextField
                  fullWidth
                  label="Event Price"
                  variant="outlined"
                  name="price"
                  type="number"
                  value={event.price}
                  error={!!errors.price}
                  helperText={errors.price || " "}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Price */}

              {/* VAT */}
              <div>
                <TextField
                  fullWidth
                  label="Event VAT"
                  variant="outlined"
                  name="vat"
                  type="number"
                  value={event.vat}
                  error={!!errors.vat}
                  helperText={errors.vat || " "}
                  onChange={(e) => handleInputChange("vat", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* VAT */}

              {/* Description */}
              <div>
                <TextField
                  fullWidth
                  label="Event Description"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={4}
                  value={event.description}
                  error={!!errors.description}
                  helperText={errors.description || " "}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* Description */}

              {/* eventHostDetails */}
              <div>
                <TextField
                  fullWidth
                  label="Event Host Details"
                  variant="outlined"
                  name="eventHostDetails"
                  multiline
                  rows={4}
                  value={event.eventHostDetails}
                  error={!!errors.eventHostDetails}
                  helperText={errors.eventHostDetails || " "}
                  onChange={(e) => handleInputChange("eventHostDetails", e.target.value)}
                  sx={ inputCss }
                />
              </div>
              {/* eventHostDetails */}

              {/* Start Date */}
              <div className="col-span-6 sm:col-span-3 relative">

                <TextField
                  fullWidth
                  type="datetime-local"
                  name="start_date"
                  id="start_date"
                  label="Start Date"
                  value={event.start_date || ""}
                  variant="outlined"
                  error={!!errors.start_date}
                  helperText={errors.start_date || " "}
                  onChange={(ev) => setEvent({ ...event, start_date: ev.target.value })}
                  placeholder=""
                sx={inputCss}

                />
              </div>
              {/* Start Date */}

              {/* End Date */}
              <div className="col-span-6 sm:col-span-3 relative">

                <TextField
                  fullWidth
                  type="datetime-local"
                  label="End Date"
                  name="end_date"
                  id="end_date"
                  value={event.end_date || ""}
                  variant="outlined"
                  error={!!errors.end_date}
                  helperText={errors.end_date || " "}
                  onChange={(ev) => setEvent({ ...event, end_date: ev.target.value })}
                  placeholder=""
                  sx={ inputCss }
                />
              </div>
              {/* End Date */}

              {/* Trainers */}
              <div>
      <p className="font-semibold">Select Trainers</p>
      <div className="flex justify-between items-start">
        {trainers.map((trainer) => (
          <FormControlLabel
            key={trainer.id}
            control={
              <Checkbox
                checked={selectedTrainers.includes(trainer.id.toString())}
                onChange={handleCheckboxChange}
                name={trainer.id.toString()}
                color="primary" // You can set the color to 'default' or 'secondary' as needed
              />
            }
            label={trainer.name}
          />
        ))}
      </div>
    </div>
              <InputError message={errors.selectedTrainers} className="mt-2" />
              {/* Trainers */}
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              {/* Conditionally render the button based on the mode */}
              {mode === "update" ? (
                <>
                  <Button type="submit" variant="contained" color="primary">
                    Update
                  </Button>
                </>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};

export default NewEvent;
