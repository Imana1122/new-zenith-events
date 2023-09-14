import React from 'react';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../const/navigation';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FaCross, FaDeleteLeft } from 'react-icons/fa6';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { ApplicationLogo } from '../../core/ApplicationLogo';

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export const Sidebar = ({ logout, handleSidebarToggle }) => {
  return (
    <div className='bg-neutral-900 w-60 h-full p-3 flex flex-col text-white'>

            <FaArrowCircleLeft onClick={handleSidebarToggle} className=' text-red-500 absolute right-5 top-2 cursor-pointer md:hidden'/>

      <div className='flex items-center gap-2 px-2 py-3'>

        <span className='text-neutral-100 text-lg'><ApplicationLogo/> </span>
      </div>
      <div className='flex-1 flex flex-col overflow-auto'>
        <div className='flex-1 py-8 flex flex-col gap-0.5 overflow-auto '>
          {/* Render sidebar links */}
          {DASHBOARD_SIDEBAR_LINKS.map((item) => {
            return (
              <SidebarLink key={item.key} item={item} />
            );
          })}
        </div>

        <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
          {/* Render bottom links */}
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => {
            return (
              <SidebarLink key={item.key} item={item} />
            );
          })}
          {/* Logout link */}
          <div className={classNames('text-red-500 cursor-pointer', linkClasses)} onClick={logout}>
            <span className='text-xl'><HiOutlineLogout /></span>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

function SidebarLink({ item }) {
  const { pathname } = useLocation();

  return (
    // Highlight the active link based on the current location
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? 'text-white bg-neutral-700' : 'text-neutral-400',
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
