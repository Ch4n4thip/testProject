import Link from "next/link";
import Navbar from '../../Components/Navbar/navLogin';
import Footer from "../Footer/Footer";
import styles1 from "./Register.module.css";
import Image from 'next/image'
import logo from "../../img/Png 1250.png"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'

function regClick() {
  const url = 'http://localhost:3000/api/regClick'
  const Emaildata = document.querySelector('#Email').value
  const Namedata = document.querySelector('#Name').value
  const Passdata = document.querySelector('#Password').value
  const Datedata = document.querySelector('#BirthDate').value
  
  axios.post(url, {
        email: Emaildata,
        name : Namedata,
        password : Passdata ,
        birth_date : Datedata 
        
    }).then((response) => {
      alert("กรุณายืนยันตัวตนก่อนเข้าใช้งาน ("+Emaildata+")");
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
    }

export default function Register() {
  const [email, setEmail] = useState('')
    
      const sendLoginVerification = e => {
        e.preventDefault()
        
        // Notice, we are also redirecting users to the protected route instead of the homepage after signing in. 
        signIn('email', { callbackUrl: '../protected/_middleware.js', email })
      }
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
              <form action="/Register/Register" method="get"  className={styles1.form}>
                <input type="text" id='Name' placeholder=' โปรดใส่ชื่อผู้ใช้' required/>
                <input type="password" id='Password' placeholder=' โปรดใส่รหัสผ่าน' required/>
                <input type="email" id='Email' placeholder=' โปรดใส่อีเมลเพื่อทำการยืนยัน' value={email} required onChange={e => setEmail(e.target.value)}/>
                <input type="date" id='BirthDate' placeholder=' โปรดใส่ที่เกิด' required/>
                <button type='submit' className='btn btn-primary' onClick={()=>{ regClick()}}>ยืนยัน</button> 
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
                  <span>หากมีบัญชีอยู่แล้ว คุณสามารถ <Link href="../Login/Login"><u>เข้าสู่ระบบ</u></Link></span>
                  </div>
              </div>
            </div>        
        </div>
      <Footer/>
      </>
    );
  }