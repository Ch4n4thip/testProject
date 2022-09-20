import Link from "next/link";
import NavL from "../../Components/Navbar/navLogin";
import Footer from "../Footer/Footer"
import styles1 from './Login.module.css'

export default function Login() {
    return ( <>
  
    <NavL/> 
    <body className={styles1.Login}>
      <div className={styles1.login__container}>
        <h2>PICTURE</h2>
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
              <Link href="#"><p className={styles1.login__forgot} >ลืมรหัสผ่าน</p></Link>
              <Link href="../Register/Register"><p className={styles1.login__new}>สมัครบัญชีใหม่</p></Link>
            </div>
          </div>
        </div>        
    </body>
      <Footer/>
      </>
    );
  }
