import Link from "next/link";
import Navbar from '../../Components/Navbar/navLogin';
import Footer from "../Footer/Footer";
import styles1 from "./Register.module.css";
import Image from 'next/image'
import logo from "../../img/Png 1250.png"
import axios from 'axios'
import Swa from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import {Router, useRouter} from 'next/router'




function RegClick() {
  const url = 'http://localhost:3000/api/regClick'
  const Emaildata = document.querySelector('#Email').value
  const Passdata = document.querySelector('#Password').value
  const Namedata = document.querySelector('#Name').value
  const Datedata = document.querySelector('#BirthDate').value
  

  axios.post(url, {
        email: Emaildata,
        name : Namedata,
        password : Passdata ,
        birth_date : Datedata 
    }).then((response) => {
      toast.success('Successfully created!');
    })
    .catch((error) => {
      console.log("console have it")
      toast.error('This is an error!');
      })
    }

export default function Register() {
 
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
              <form  method="" className={styles1.form}>
                <input type="text" id='Name' placeholder=' โปรดใส่ชื่อผู้ใช้' required/>
                <input type="password" id='Password' placeholder=' โปรดใส่รหัสผ่าน' required/>
                <input type="text" id='Email' placeholder=' โปรดใส่อีเมลเพื่อทำการยืนยัน' required/>
                <input type="date" id='BirthDate' placeholder=' โปรดใส่วันที่เกิด' required/>
                <button type='submit' className='btn btn-primary' onClick={()=> RegClick()}>ยืนยัน</button> 
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
