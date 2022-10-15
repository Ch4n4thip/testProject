import Link from "next/link";
import React from "react";
import NavL from "../../Components/Navbar/navLogin";
import Footer from "../Footer/Footer"
import styles1 from './Login.module.css'
import Image from 'next/image'
import logo from "../../img/Png 1250.png"
import axios from 'axios'
import { useRouter } from 'next/router'
import { send } from "process";
import { BsSegmentedNav } from "react-icons/bs";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { increment } from "../../slices/counterSlice";





export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  function LoginClick() {
    const url = 'http://localhost:3000/api/loginClick'
    const EmailCheck = document.querySelector('#Email').value
    const PassCheck = document.querySelector('#Password').value

    axios.post(url, {
      email: EmailCheck,
      password: PassCheck

    }).then((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logged In Welcome',
        showConfirmButton: false,
        timer: 1500
      })
        dispatch(increment(response.data.payload))
        console.log(response.data.payload)
      //router.push('/')

     console.log(response.data)
    }).catch((error) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Email or Password is Incorrect',
        showConfirmButton: false,
        timer: 1500
      })
      //console.log(error.response.data)
    })

  }
  return (<>
    <NavL />
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
          <div action="" className={styles1.form}>
            <input type="text" id='Email' placeholder=' โปรดใส่อีเมล' required />
            <input type="password" id='Password' placeholder=' โปรดใส่รหัสผ่าน' required />
            <button type='submit' className='btn btn-primary' onClick={() => { LoginClick() }}>เข้าสู่ระบบ</button>
          </div>
          <div className={styles1.login__option}>
            <p className={styles1.login__forgot}><Link href="#">ลืมรหัสผ่าน</Link></p>
            <p className={styles1.login__new}><Link href="../Register/Register">สมัครบัญชีใหม่</Link></p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}