import { useState } from "react";
import DangerButton from "../../../components/core/DangerButton";
import Modal from "../../../components/core/Modal";
import SecondaryButton from "../../../components/core/SecondaryButton";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contents/ContextProvider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

// DeleteUserForm component
export default function DeleteUserForm({ className = '' }) {
    // Getting currentUser and userToken from the context
    const { setCurrentUser, setUserToken, currentUser, userToken } = useStateContext();

    // State variables
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState("");
    const [processing, setProcessing] = useState(false);

    // Function to open the confirmation modal
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    // Function to delete the user account
    const deleteUser = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Send delete request to the server with the provided password
        axiosClient
            .delete("/deleteUser", {
                data: {
                    password: password,
                },
            })
            .then((response) => {
                // On successful deletion, reset currentUser and userToken
                setCurrentUser({});
                setUserToken(null);
                console.log(currentUser, userToken);
            })
            .catch((error) => {
                // If there is an error during deletion, display the error message
                // console.log(error);
                setErrors(error.response.data.error);
                setProcessing(false);
            });
    };

    // Function to close the confirmation modal and reset state variables
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setProcessing(false);
        // Reset password and errors when closing the modal
        setPassword("");
        setErrors("");
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <Typography variant="h6" className="text-gray-900">Delete Account</Typography>
                <Typography variant="body2" className="mt-1 text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </Typography>
                {message && <Typography variant="body2" className="mb-4 font-medium text-green-600">{message}</Typography>}
            </header>

            {/* Button to initiate the account deletion process */}
            <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

            {/* Modal for confirming the user deletion */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <Typography variant="h6" className="text-gray-900">
                        Are you sure you want to delete your account?
                    </Typography>
                    <Typography variant="body2" className="mt-1 text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </Typography>

                    {/* Password Input */}
                    <div className="relative mt-4">
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
                            error={!!errors}
                            helperText={errors}
                        />
                    </div>
                    {/* Password Input */}

                    {/* Buttons to confirm or cancel the account deletion */}
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton className="ml-3" disabled={processing} type="submit">
                            {processing ? 'Deleting' : 'Delete Account'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
