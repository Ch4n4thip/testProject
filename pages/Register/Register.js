import Link from "next/link";
import Navbar from "../../Components/Navbar/navLogin";
import Footer from "../Footer/Footer";
import styles1 from "./Register.module.css";
import Image from 'next/image'
import logo from "../../img/Png 1250.png"
import axios from 'axios'



function regClick() {
  const url = 'http://localhost:3000/api/regClick'
  const Emaildata = document.querySelector('#Email').value
  axios.post(url, {
        email: Emaildata
    }).then((response) => {
        
    })
    .catch((error) => {
    })
    }

export default function Register() {
    return (
      <>      
      <Navbar/> 
        <body className={styles1.Register}>
          <div className={styles1.register__container}>
          <Image 
                alt="Home"
                src={logo}
                // layout="fill"
                // objectFit="cover"
                width={500}
                height={500}
            />
          </div>
          <div className={styles1.register__container}> 
            <div className={styles1.register__container__form}>
              <h1>สมัครบัญชีใหม่</h1>
              <form action="" className={styles1.form}>
                <input type="text" id='Email' placeholder=' โปรดใส่อีเมลเพื่อทำการยืนยัน' required/>
                <button type='submit' className='btn btn-primary' onClick={regClick}><Link href="/Register/Verify">ยืนยัน</Link> </button> 
              </form> 
                  <p className={styles1.firstP} >โดยการเปิดบัญชี Ject Jobe ท่านรับทราบและตกลงตาม</p>
                  <div className={styles1.secondP}>
                      <p>
                        <Link href="#">เงื่อนไขการให้บริการ </Link>
                        <small className={styles1.small}>และ </small>
                        <Link href="#"> นโยบายความเป็นส่วนตัว</Link> 
                      </p>
                  </div>
                  <div className={styles1.third}>
                  <p>หากมีบัญชีอยู่แล้ว คุณสามารถ <Link href="../Login//Login"><u>เข้าสู่ระบบ</u></Link></p>
                  </div>
              </div>
            </div>        
        </body>
      <Footer/>
      </>
    );
  }
