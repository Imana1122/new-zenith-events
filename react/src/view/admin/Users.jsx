import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TButton from "../../components/core/TButton";
import axiosClient from "../../axios";
import { useStateContext } from "../../contents/ContextProvider";
import { highlightSearchQuery } from "../../utility/HighlightText";
import Modal from "../../components/core/Modal";
import { CiWarning } from "react-icons/ci";
import { superadmin } from "../../superadmin";
import toast from "react-hot-toast";

export const Users = () => {
  const { searchQuery, currentUser } = useStateContext();
  const [ users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setTrainerIdToDelete] = useState(null);

  useEffect(() => {
    search();
  }, [searchQuery]);

  const search = () => {
    if (searchQuery) {
      axiosClient
        .get('/search/users', { params: { query: searchQuery } })
        .then((response) => {
          // Update the 'users' state with the search results
          setUsers(response.data);
        })
        .catch((error) => {
        });
    } else {
      axiosClient
        .get("/getUsers")
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
        //   console.error(error);
        });
    }
  }

  const handleDelete = (userId) => {
    axiosClient
      .delete(`/deleteUser/${userId}`)
      .then(() => {
        search();
        setIsModalOpen(false);

      })
      .catch((error) => {
        setIsModalOpen(false);
        if(error.response.data.error){
            toast.error(error.response.data.error);
        }
      });
  };

  const onDeleteClick = (userId) => {
    setIsModalOpen(true);
    setTrainerIdToDelete(userId);
  };

  return (
    <PageComponent
      title="Users"
      buttons={
        currentUser.phoneNumber === superadmin&&(
        <TButton color="green" to="/signup">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
        )}
    >
      <div className="mt-3 text-sm">
        <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
          <thead className="bg-gray-400">
            <tr>
              <th className="border border-gray-200 p-2">ID</th>

              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">PhoneNumber</th>
              {currentUser.phoneNumber === superadmin && <th>Change</th>}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr className="border border-gray-200" key={user.id}>
                  <td className="border border-gray-200 p-2">
                    {/* Convert the ID to a string and use the highlightSearchQuery function to display it */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(user.id.toString(), searchQuery) }} />
                  </td>

                  <td className="border border-gray-200 p-2">
                    {/* Use the highlightSearchQuery function to display the user's name */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(user.name, searchQuery) }} />
                  </td>

                  <td className="border border-gray-200 p-2">
                    {user.phoneNumber}
                  </td>

                  {currentUser.phoneNumber === superadmin && (<td className="border border-gray-200 p-2 flex items-center">
                    <div className="flex justify-between items-center mt-3">

                      <div className="flex items-center">
                        {user.id && (
                          <TButton onClick={() => { onDeleteClick(user.id) }} circle color="red">
                            <TrashIcon className="w-5 h-5" />
                          </TButton>
                        )}
                      </div>
                    </div>
                  </td>)}
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-200 p-2" colSpan={6}>
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Modal for delete confirmation */}
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            {/* Add a focusable element (e.g., a button) for initial focus */}
            <button className="hidden" autoFocus />
            <p className="flex items-center"><span className="text-red-500 font-bold text-4xl mr-5"><CiWarning /></span>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(userIdToDelete)}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </PageComponent>
  );
};
