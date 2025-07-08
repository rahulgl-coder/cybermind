import React from 'react';
import Nav from './Navbar'


import Serarch from '../Components/Search'
function Header() {
  return (
    <div className=" h-[214px] opacity-100 bg-white w-full  shadow-[0px_14px_14px_0px_#C6BFBF40]" >
      <Nav/>
      <Serarch/>
    </div>
  );
}

export default Header;