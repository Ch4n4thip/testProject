
import Image from 'next/image'
import React from "react";
import {GrContact} from 'react-icons/gr'
import {SiAboutdotme} from  'react-icons/si'
import {GiSkills, GiSmallFire} from 'react-icons/gi'
import {MdOutlineDesignServices,MdHome,MdPermContactCalendar} from 'react-icons/md'
import styles1 from './sideNav.module.css'


export default function sideNav() {
    return (
        <nav className={styles1.nav}>
              <h1>Test</h1>
              <Link href="#">  asd <MdHome/>   </Link>
              <Link href="#">   asd<SiAboutdotme/> </Link>
              <Link href="#">  asd <MdOutlineDesignServices/>  </Link>
              <Link href="#">  asd <MdOutlineDesignServices/>  </Link>
              <Link href="#">  asd <MdPermContactCalendar/>    </Link>
        </nav>
      )
}


