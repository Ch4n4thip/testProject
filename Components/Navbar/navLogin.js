import Link from "next/link";
import Image from 'next/image'
import logo from "../../img/Black Font 750.png"
import styles1 from './NavLogin.module.css'
export default function NavbarLogin() {
    return (
        
      <nav className={styles1.NavbarItem}>
        <section className="flex justify-end p-5">
        <Link href="/">
            <Image 
                alt="Home"
                src={logo}
                // layout="fill"
                // objectFit="cover"
                width={125}
                height={125}
            />
        </Link> 
        </section>
      </nav>
    )
  }
  