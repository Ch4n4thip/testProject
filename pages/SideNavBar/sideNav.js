import React from 'react'
import {GrCart , GrHome} from 'react-icons/gr'
import {RiCoupon2Line , RiScales3Line} from 'react-icons/ri'
import {BiCommentDetail} from 'react-icons/bi'
import {AiOutlineHistory} from 'react-icons/ai'
import {FiFilter} from 'react-icons/fi'
import { useState } from 'react'
import styles1 from './sideNav.module.css'
import Link from 'next/link'
const sideNav = () => {
  const [activeNav,setActive] = useState('#');
  return (
    <nav className={styles1.Nav}>
      <Link href="#"  onClick={()=>setActive('#')} className={activeNav === '#' ? 'active' : ''}><GrHome/></Link>
      <Link href="#about"  onClick={()=>setActive('#about')} className={activeNav === '#about' ? 'active' : ''} ><GrCart/></Link>   
      <Link href="#exp"  onClick={()=>setActive('#exp')} className={activeNav === '#exp' ? 'active' : ''} ><RiCoupon2Line/></Link>    
      <Link href="#services"   onClick={()=>setActive('#services')} className={activeNav === '#services' ? 'active' : ''} ><RiScales3Line/></Link>      
      <Link href="#contact"  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><BiCommentDetail/></Link>
      <Link href="#contact"  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><AiOutlineHistory/></Link>
      <Link href="#contact"  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><FiFilter/></Link>
    </nav>
  )
}
export default sideNav