import React from 'react'
<<<<<<< HEAD
import {GrContact} from 'react-icons/gr'
=======
import {GrContact,GrHome,GrCart} from 'react-icons/gr'
import {RiCoupon2Line , RiScales3Line} from 'react-icons/ri'
>>>>>>> ae30f1924ce43db38e956134193d57a1d9e1b0ae
import {SiAboutdotme} from  'react-icons/si'
import {BiCommentDetail} from 'react-icons/bi'
import {GiSkills, GiSmallFire} from 'react-icons/gi'
import {MdOutlineDesignServices,MdHome,MdPermContactCalendar} from 'react-icons/md'
<<<<<<< HEAD
import { useState } from 'react'
import style1 from './sideNav.module.css'
const sideNav = () => {
  const [activeNav,setActive] = useState('#');
  return (
    <nav className={style1.Nav}>
      <a href="#"  onClick={()=>setActive('#')} className={activeNav === '#' ? 'active' : ''}><MdHome/></a>
      <a href="#about"  onClick={()=>setActive('#about')} className={activeNav === '#about' ? 'active' : ''} ><SiAboutdotme/></a>   
      <a href="#exp"  onClick={()=>setActive('#exp')} className={activeNav === '#exp' ? 'active' : ''} ><GiSkills/></a>    
      <a href="#services"   onClick={()=>setActive('#services')} className={activeNav === '#services' ? 'active' : ''} ><MdOutlineDesignServices/></a>      
      <a href="#contact"  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><MdPermContactCalendar/></a>
=======
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
>>>>>>> ae30f1924ce43db38e956134193d57a1d9e1b0ae
    </nav>
  )
}
export default sideNav