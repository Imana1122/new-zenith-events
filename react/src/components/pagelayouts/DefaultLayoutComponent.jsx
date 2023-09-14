import React from 'react';
import Footer from '../Footer';
import { Header } from '../Header';

export const DefaultLayoutComponent = ({ title, children }) => {
  const navigation = [
    { name: "Home", to: "/" },
    { name: "Training", to: "/training" },
    { name: "Ticket", to: "/ticket" },
    { name: "Contact", to: "/contact" },
  ];



  return (
    <div className='flex flex-col min-h-screen w-screen '>
      <div className='fixed top-0 left-0 w-full z-10 bg-white h-[69px]'>
        <Header navigation={navigation}/>
      </div>

      <div className='flex flex-1 flex-col justify-start items-start w-full sm:px-6 lg:px-8 space-y-6 mt-[69px]'>
        {/* Title of the user layout */}
        <h2 className='font-bold text-xl text-purple-800 leading-tight font-serif ml-4'>{title}</h2>

        {/* Container for the content */}
        <div className='w-full'>
          {/* Render the child components passed as children */}
          {children}
        </div>
      </div>

      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
};


