import Link from "next/link";
import Image from 'next/image'
import logo from "../../img/Png 250.png"
import styles1 from './Navbar.module.css'
import { useDispatch } from "react-redux";
import { increment } from "../../slices/counterSlice";
import { useEffect , useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function Navbar() {
    const router = useRouter();
    const [ status , setStatus] = useState("NOTOK");

    function toLogOutClick() {
        localStorage.clear();
        window.location.reload(false);
        router.push('/');
        Swal.fire({
            position: 'center',
                icon: 'success',
                title: 'Logging Out',
                showConfirmButton: false,
                timer: 1500
          })
    }

    useEffect(() => {
        if( localStorage.getItem("Email")){ setStatus("OK")}
        else { setStatus("NOTOK")}
      },[] ); 

      if(status === "OK"){
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
            <button type='submit' onClick={() => { toLogOutClick() }}>LogOut</button>
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
    )}
    if(status === "NOTOK"){
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
    )}

  }
  