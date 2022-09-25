import Image from 'next/image'
import React from "react";
import {GrContact} from 'react-icons/gr'
import {SiAboutdotme} from  'react-icons/si'
import {GiSkills, GiSmallFire} from 'react-icons/gi'
import {MdOutlineDesignServices,MdHome,MdPermContactCalendar} from 'react-icons/md'
import styles1 from './sideNav.module.css'
import Link from "next/link";


export default function sideNav() {
    return (
        <nav className={styles1.Nav}>
              
                <ul>
                    <li><Link href="#"><SiAboutdotme/></Link></li>
                    <li><Link href="#"><MdOutlineDesignServices/></Link></li>
                    <li><Link href="#"><MdOutlineDesignServices/></Link></li>
                    <li><Link href="#"><MdPermContactCalendar/></Link></li>
{/* 
                <Link href="/">  <SiAboutdotme/> </Link>
                <Link href="/">  <MdOutlineDesignServices/>  </Link>
                <Link href="/">  <MdOutlineDesignServices/>  </Link>
                <Link href="/">  <MdPermContactCalendar/>    </Link> */}
                </ul>
        </nav>
      )
}