import React from 'react'
import { HiOutlineCube, HiOutlineCog, HiOutlineQuestionMarkCircle, HiOutlineViewGrid} from 'react-icons/hi'
import {IoBagHandle,IoCallOutline,IoImageOutline,IoPeopleOutline} from 'react-icons/io5'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: "dashborad",
        label: "Dashboard",
        path: '/',
        icon: <HiOutlineViewGrid className='text-yellow-600' />
    },
    {
        key:'events',
        label:'Events',
        path: '/events',
        icon: <HiOutlineCube className='text-yellow-600'/>
    },
    {
        key:'trainers',
        label:'Trainers',
        path: '/trainers',
        icon: <IoPeopleOutline className='text-yellow-600'/>

    },
    {
        key:'bookings',
        label:'Bookings',
        path: '/bookings',
        icon: <IoBagHandle className='text-yellow-600'/>
    },
    {
        key:'users',
        label:'Users',
        path: '/users',
        icon: <IoPeopleOutline className='text-yellow-600'/>
    },
    {
        key:'contact-details',
        label:'Contacts',
        path: '/contact-details',
        icon: <IoCallOutline className='text-yellow-600'/>
    },
    {
        key:'application-images',
        label:'Application Images',
        path: '/application-images',
        icon: <IoImageOutline className='text-yellow-600'/>
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        path: '/',
        icon: <HiOutlineCog />
    },
    {
        key:'support',
        label:'Help and Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle/>
    }
]

