import React from 'react'
import ZenithEventsLogo from '../../assets/zenitheventslogo.svg';

export const ApplicationLogo = ({className}) => {

  return (
    <div><img className={className} src={ZenithEventsLogo} alt="logo"/> </div>
  )
}
