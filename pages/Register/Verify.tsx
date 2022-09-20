import Link from "next/link";
import React , {useState} from "react";
import Navbar from "../../Components/Navbar/navLogin";
import styles1 from './verify.module.css'
import OneTime from "./OneTime";
import Footer from "../Footer/Footer"


export default function Verify() {
  const [otp, setOtp] = useState('');
  const onChange = (value:string) => setOtp(value);
    return (
        <>
        <Navbar/> 
        
      {/* <body className={styles1.Login}> */}
      <div className={styles1.Verify__container}> 
        <div className={styles1.Verify__container__form}>
          
          <h1>กรุณาใส่รหัสยืนยันตัวตน</h1>
          <h3>รหัสยืนยันตัวตนจะถูกส่งไปทาง Email ที่</h3>
          <h3>email@example.com</h3>
          <form action="" className={styles1.form}>
            <OneTime value={otp} valueLength={6} onChange={onChange} /> 
            <p>ไม่ได้รับรหัส?</p>
            <p><span>ส่งอีกครั้ง</span> หรือ <span>ลองใช้วิธีการยืนยันตัวตนวิธีอื่น</span></p>
            <button type='submit' className='btn btn-primary'>ยืนยัน</button>
            
            
          </form>
          
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <Footer/>
        
    {/* </body> */}
      </>
      

    );
  }


