import Link from "next/link";
import NavL from "../../Components/Navbar/navLogin";
import Footer from "../Footer/Footer"
import styles1 from './Login.module.css'
import Image from 'next/image'
import logo from "../../img/Png 1250.png"

export default function Login() {
    return ( <>
    <NavL/> 
    <div className={styles1.Login}>
      <div className={styles1.login__container}>
         <Image 
                alt="Home"
                src={logo}
                // layout="fill"
                // objectFit="cover"
                width={500}
                height={500}
            />
      </div>
      <div className={styles1.login__container}> 
        <div className={styles1.login__container__form}>
          <h1>เข้าสู่ระบบ</h1>
          <form action="" className={styles1.form}>
            <input type="text" name='Email' placeholder=' โปรดใส่อีเมล' required/>
            <input type="password" name='Password' placeholder=' โปรดใส่รหัสผ่าน' required/>
            <button type='submit' className='btn btn-primary'>เข้าสู่ระบบ</button> 
          </form> 
            <div className={styles1.login__option}>
              <p className={styles1.login__forgot}><Link href="#">ลืมรหัสผ่าน</Link></p>
              <p  className={styles1.login__new}><Link href="../Register/Register">สมัครบัญชีใหม่</Link></p>
            </div>
          </div>
        </div>        
    </div>
      <Footer/>
      </>
    );
  }