import Link from "next/link";
import Image from 'next/image'
import logo from "../../img/Png 250.png"
import styles1 from './Navbar.module.css'
export default function Navbar() {
 
    return (
        
      <nav className={styles1.NavbarItem}>
        <section className={styles1.Logo}>
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
        </section>
        <section className="flex justify-end p-5">
        <div className={styles1.btn}>
            <Link href="/Login/Login"><p>Login</p></Link>
        </div>
        </section>
        {/* <Link href="Log" className="btn">
            Login
        </Link> */}
        <div className={styles1.Search}>
            <input type="text" placeholder=" ค้นหา"/></div>
        {/* <Image src={logo} className="Logo" alt="Logo"/> */}
        {/* <Link href="/"></Link> */}
          
        
      </nav>
    )
  }
  