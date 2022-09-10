import Link from "next/link";
import Image from 'next/image'
import logo from "../img/Png 250.png"
import styles1 from '../styles/Navbar.module.css'
import Home from "../pages/Home";
import Login from "../pages/Login";
export default function Navbar() {
    return (
      <nav className={styles1.NavbarItem}>
        <Link href="Home">
            <Image 
                alt="Home"
                src={logo}
                // layout="fill"
                // objectFit="cover"
                width={145}
                height={145}
            />
        </Link>
        <div className={styles1.btn}>
            <Link href="Login" ><p>Login</p></Link>
        </div>
       
        {/* <Link href="Log" className="btn">
            Login
        </Link> */}
        <div className="Search">
            <input type="text" placeholder=" ค้นหา"/></div>
        {/* <Image src={logo} className="Logo" alt="Logo"/> */}
        {/* <Link href="/"></Link> */}
          
  
      </nav>
    )
  }
  