import { Menu, Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contents/ContextProvider';
import { TfiLayoutGrid3Alt } from 'react-icons/tfi';
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from '@mui/material';
import { inputCss } from '../css-components/text-field';


export const Header = ({ logout, currentUser,onSidebarToggle }) => {
  const navigate = useNavigate();
  const { setSearchQuery } = useStateContext();

  // Function to handle user search
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state
  };

  return (
    <div className='bg-white h-[64px] min-h-[68px] mt-5 px-4 flex flex-row items-center border-1 border-gray-200 justify-between min-w-[50rem] md:w-full '>
        <div className='flex space-x-10 items-center md:hidden'>
             {/* Sidebar Toggle Button */}
        <button
          onClick={onSidebarToggle}
          className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
        >
          <TfiLayoutGrid3Alt className="w-[3rem] h-[3rem]" />
        </button>
        {/* Search Input */}
        <div>
            <TextField
            label="Search"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
            }}
            onChange={(e) => handleSearch(e.target.value)}
            sx={inputCss}
            />

        </div>
        </div>
        <div className=' hidden md:block'>
        {/* Search Input */}
        <div>
            <TextField
            label="Search"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
            }}
            onChange={(e) => handleSearch(e.target.value)}
            sx={inputCss}
            />

        </div>
        </div>

      {/* Icons and Menu */}
      <div className='flex items-center gap-2 mr-2'>
        {/* Messages Popover */}
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(open && 'bg-grey-100', 'inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-grey-100 p-1.5 rounded-sm')}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-8 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-80'>
                  <div className='bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                    <strong className='text-gray-700 font-medium'>Messages</strong>
                    <div className='mt-2 py-1 text-sm'>This is messages posts</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        {/* Notifications Popover */}
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(open && 'bg-grey-100', 'inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-grey-100 p-1.5 rounded-sm')}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-8 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-80'>
                  <div className='bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                    <strong className='text-gray-700 font-medium'>Messages</strong>
                    <div className='mt-2 py-1 text-sm'>This is notification posts</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        {/* User Menu */}
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400'>
              <span className='sr-only'>Oven user menu</span>
              <div
                className='h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center'
                style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
              >
                <span className='sr-only'>Hugh Jackson</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(active && 'bg-gray-100', 'text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2')}
                      onClick={() => {
                        navigate('/profile');
                      }}
                    >
                      Settings
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(active && 'bg-gray-100', 'text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2')}
                      onClick={() => {
                        navigate(`/profile?name=${currentUser.name}&email=${currentUser.email}&phoneNumber=${currentUser.phoneNumber}`);
                      }}
                    >
                      Profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(active && 'bg-gray-100', 'text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2')}
                      onClick={logout}
                    >
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
