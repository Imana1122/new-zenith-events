import React from 'react'
import API_BASE_URL from '../../apiConfig';
import axiosClient from '../../axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const ApplicationLogo = ({className}) => {
    const [logo, setLogo] = useState('');

    useEffect(()=>{
        getImages()
    },[])

  const getImages = () => {
      axiosClient.get('/get-application-details')
        .then((response) => {
        //   console.log(response);
          setLogo(response.data.application_detail.logo);

        })
        .catch((error) => {
        //   console.log(error);
        });

  }
  return (
    <div><img className={'w-full h-full'+className} src={API_BASE_URL + '/storage/images/application/' + logo} alt="logo"/> </div>
  )
}
