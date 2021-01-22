import React from 'react';
import ToDo from '../todo';
import Header from '../header/header'
import Footer from '../footer/footer'

import AppSettingsContext from '../../context/settings/context';
import Auth from '../../context/auth/auth';

function If(props) {
  return (
    <Auth capability="read">
      < AppSettingsContext >
        <Header/>
        <ToDo />
        <Footer/>
      </AppSettingsContext >
    </Auth>
  )

}

export default If;
