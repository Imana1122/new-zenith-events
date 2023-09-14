import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TButton from "../../components/core/TButton";
import axiosClient from "../../axios";
import { Tab } from '@headlessui/react';
import classNames from "classnames";
import { useStateContext } from "../../contents/ContextProvider";
import { highlightSearchQuery } from "../../utility/HighlightText";
import Modal from "../../components/core/Modal";
import { CiWarning } from "react-icons/ci";
import API_BASE_URL from "../../apiConfig";
import { FaFacebook, FaGithub, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";

export const ContactDetails = () => {

  const [contactDetails, setContactDetails] = useState([]);

    useEffect(()=>{
        getContacts()
    },[])

  const getContacts = () => {
      axiosClient.get('/get-contact-details')
        .then((response) => {
        //   console.log(response);
          setContactDetails(response.data.contact);

        })
        .catch((error) => {
        //   console.log(error);
        });

  }


  return (
    <PageComponent
      title="Contact Details"
      buttons={
        <TButton color="green" to="/contact-details/update">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
        Update
        </TButton>
      }
    >

<div className="mt-3 text-sm">
        <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
        <thead className="bg-gray-400">
                        <tr>


                          <th className="border border-gray-200 p-2">Phone</th>
                          <th className="border border-gray-200 p-2">Email</th>
                          <th className="border border-gray-200 p-2">Location</th>
                          <th className="border border-gray-200 p-2"><FaFacebook/> </th>
                          <th className="border border-gray-200 p-2"><FaTwitter/> </th>
                          <th className="border border-gray-200 p-2"><FaYoutube/></th>
                          <th className="border border-gray-200 p-2"><FaTiktok/></th>
                          <th className="border border-gray-200 p-2"><FaInstagram/></th>
                          <th className="border border-gray-200 p-2"><FaGithub/></th>
                          <th className="border border-gray-200 p-2">Messaging</th>
                        </tr>
                      </thead>
          <tbody>
            {contactDetails.length > 0 && (
              contactDetails.map((contact) => (
                <tr className="border border-gray-200" key={contact.id}>
                <td className="border border-gray-200 p-2">{contact.phone}</td>

                <td className="border border-gray-200 p-2">{contact.email}</td>
                <td className="border border-gray-200 p-2">{contact.location}</td>
                <td className="border border-gray-200 p-2">{contact.facebook_link?(contact.facebook_link):(<p>Not set</p>)}</td>
                <td className="border border-gray-200 p-2">{contact.twitter_link?(contact.twitter_link):(<p>Not set</p>)}</td>
                <td className="border border-gray-200 p-2">{contact.youtube_link?(contact.youtube_link):(<p>Not set</p>)}</td>
                <td className="border border-gray-200 p-2">{contact.tiktok_link?(contact.tiktok_link):(<p>Not set</p>)}</td>
                <td className="border border-gray-200 p-2">{contact.instagram_link?(contact.instagram_link):(<p>Not set</p>)}</td>
                <td className="border border-gray-200 p-2">{contact.github_link?(contact.github_link):(<p>Not set</p>)}</td>
                <td className="border border-gray-200 p-2">{contact.allow_send_message === 1 ?(<p className="text-green-500">Yes</p>):(<p className="text-red-500">No</p>)}</td>

              </tr>
              )))
            }
          </tbody>
        </table>

      </div>


    </PageComponent>
  );
};
