import styles1 from './Compare.module.css'
import SideNav from '../SideNavBar/sideNav'
import Nav from '../../Components/Navbar/nav'
import Foot from '../Footer/Footer'
import { useEffect , useState } from 'react'

export default function Compare(){
     
    return(
        <>
        <div>
    
            <Nav/>
            <SideNav/>
            <h1> This is a Compare Page </h1>
        </div>
        <Foot/>
    </>
    )
  
  
}