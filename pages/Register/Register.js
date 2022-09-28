import Link from "next/link";
import Navbar from '../../Components/Navbar/navLogin';
import Footer from "../Footer/Footer";
import styles1 from "./Register.module.css";
import Image from 'next/image'
import logo from "../../img/Png 1250.png"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

function regClick() {
  const url = 'http://localhost:3000/api/regClick'
  const Emaildata = document.querySelector('#Email').value
  const Namedata = document.querySelector('#Name').value
  const Datedata = document.querySelector('#BirthDate').value
  
  axios.post(url, {
        email: Emaildata,
        name : Namedata,
        birth_date : Datedata 
    }).then((response) => {
      
    })
    .catch((error) => {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Already have this mail',
          footer: 'Change your email or contact our support'
        })
      })
      console.log("ERROR Already have it")
      location.href="/Register/Register"
    }

export default function Register() {
  const router = useRouter()
    return (
      <>      
      <Navbar/> 
        <div className={styles1.Register}>
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
              <form action="/Register/Verify" method="get" className={styles1.form}>
                <input type="text" id='Name' placeholder=' โปรดใส่ชื่อผู้ใช้' required/>
                <input type="text" id='Email' placeholder=' โปรดใส่อีเมลเพื่อทำการยืนยัน' required/>
                <input type="date" id='BirthDate' placeholder=' โปรดใส่ที่เกิด' required/>
                <button type='submit' className='btn btn-primary' onClick={()=>{router.replace('/Register/Verify') ;regClick()}}>ยืนยัน</button> 
              </form> 
                  <p className={styles1.firstP} >โดยการเปิดบัญชี Ject Jobe ท่านรับทราบและตกลงตาม</p>
                  <div className={styles1.secondP}>
                      <span>
                        <Link href="#">เงื่อนไขการให้บริการ </Link>
                        <small className={styles1.small}>และ </small>
                        <Link href="#"> นโยบายความเป็นส่วนตัว</Link> 
                      </span>
                  </div>
                  <div className={styles1.third}>
                  <span>หากมีบัญชีอยู่แล้ว คุณสามารถ <Link href="../Login/Login"><u>เข้าสู่ระบบ</u></Link></span>
                  </div>
              </div>
            </div>        
        </div>
      <Footer/>
      </>
    );
  }
