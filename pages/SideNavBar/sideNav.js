import React from 'react'
import {GrContact,GrHome,GrCart} from 'react-icons/gr'
import {RiCoupon2Line , RiScales3Line} from 'react-icons/ri'
import {SiAboutdotme} from  'react-icons/si'
import {BiCommentDetail} from 'react-icons/bi'
import {GiSkills, GiSmallFire} from 'react-icons/gi'
import {MdOutlineDesignServices,MdHome,MdPermContactCalendar} from 'react-icons/md'
import {AiOutlineHistory} from 'react-icons/ai'
import {FiFilter} from 'react-icons/fi'
import { useState } from 'react'
import styles1 from './sideNav.module.css'
const sideNav = () => {
  const [activeNav,setActive] = useState('#');
  return (
    <nav className={styles1.Nav}>
      <a href="#"  onClick={()=>setActive('#')} className={activeNav === '#' ? 'active' : ''}><GrHome/></a>
      <a href="#about"  onClick={()=>setActive('#about')} className={activeNav === '#about' ? 'active' : ''} ><GrCart/></a>   
      <a href="#exp"  onClick={()=>setActive('#exp')} className={activeNav === '#exp' ? 'active' : ''} ><RiCoupon2Line/></a>    
      <a href="#services"   onClick={()=>setActive('#services')} className={activeNav === '#services' ? 'active' : ''} ><RiScales3Line/></a>      
      <a href="#contact"  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><BiCommentDetail/></a>
      <a href="#contact"  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><AiOutlineHistory/></a>
      <a href="#contact"  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><FiFilter/></a>
    </nav>
  )
}
export default sideNav