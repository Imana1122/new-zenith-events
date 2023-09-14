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

export const ApplicationImages = () => {

  const [applicationImages, setApplicationImages] = useState([]);

    useEffect(()=>{
        getImages()
    },[])

  const getImages = () => {
      axiosClient.get('/get-application-details')
        .then((response) => {
          console.log(response);
          setApplicationImages(response.data.application_details);

        })
        .catch((error) => {
          console.log(error);
        });

  }


  return (
    <PageComponent
      title="Application Images"
      buttons={
        <TButton color="green" to="/application-images/update">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Update
        </TButton>
      }
    >
      <div className="mt-3 text-sm">
        <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
          <thead className="bg-gray-400">
            <tr>
              <th className="border border-gray-200 p-2">Logo</th>
              <th className="border border-gray-200 p-2">Background Image</th>
            </tr>
          </thead>
          <tbody>
            {applicationImages.length > 0 &&
              applicationImages.map((image) => (
                <tr className="border border-gray-200" key={image.id}>
                  <td className="border border-gray-200 p-2">
                    <img
                      src={API_BASE_URL + "/storage/images/application/" + image.logo}
                      alt="logo"
                      className="h-full w-full rounded-sm "
                    />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <img
                      src={API_BASE_URL + "/storage/images/application/" + image.background_image}
                      alt="background"
                      className="h-full w-full rounded-sm"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </PageComponent>
  );

};
