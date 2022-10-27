import React from 'react'
import {GrCart , GrHome} from 'react-icons/gr'
import {RiCoupon2Line , RiScales3Line} from 'react-icons/ri'
import {BiCommentDetail} from 'react-icons/bi'
import {AiOutlineHistory} from 'react-icons/ai'
import {FiFilter} from 'react-icons/fi'
import { useState , useEffect } from 'react'
import styles1 from './sideNav.module.css'
import Link from 'next/link'

const sideNav = () => {
  const [activeNav,setActive] = useState('#');
  const[ status , setStatus ] = useState('NOTOK')

  useEffect(() => {
    if( localStorage.getItem("Email")){ setStatus("OK")}
    else { setStatus("NOTOK")}
  },[] );
if( status === "OK")
  return (
    <nav className={styles1.Nav}>
      <a href='/'  onClick={()=>setActive('#')} className={activeNav === '#' ? 'active' : ''}><GrHome/></a>
      <a href='../Cart/Cart' onClick={()=>setActive('#about')} className={activeNav === '#about' ? 'active' : ''} ><GrCart/></a>   
      <a href='../Coupon/Coupon'  onClick={()=>setActive('#exp')} className={activeNav === '#exp' ? 'active' : ''} ><RiCoupon2Line/></a>    
      <a href='../Compare/Compare'   onClick={()=>setActive('#services')} className={activeNav === '#services' ? 'active' : ''} ><RiScales3Line/></a>      
      <a href='../Chat/Chat'  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><BiCommentDetail/></a>
      <a href='../History/History'  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><AiOutlineHistory/></a>
      <a href=''  onClick={()=>setActive('#contact')} className={activeNav === '#contact' ? 'active' : ''} ><FiFilter/></a>
    </nav>
  )
    else if(  status === "NOTOK"){
      return null
    }
}
export default sideNav