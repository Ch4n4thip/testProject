import {useContext} from 'react'
import { DataContext } from '../Verify'
import Link from "next/link";
import React , {useState} from "react";
import handler from '../../api/regClick'
import styles1 from '../verify.module.css'
import OneTime from "../OneTime";
import Footer from "../../Footer/Footer"

const Email = () => {
    const {setAppState} = useContext(DataContext)
    const [otp, setOtp] = useState('');
    const onChange = (value:string) => setOtp(value);
    
      return (
          <>
        
        <div className={styles1.Verify__container}> 
        <div className={styles1.Verify__container__form}>
            
            <h1>กรุณาใส่รหัสยืนยันตัวตน</h1>
            <h3>รหัสยืนยันตัวตนจะถูกส่งไปทาง Email ที่</h3>
            handler.email
            <form action="" className={styles1.form}>
              <OneTime value={otp} valueLength={6} onChange={onChange} /> 
              <p>ไม่ได้รับรหัส?</p>
              <p><span>ส่งอีกครั้ง</span> หรือ <span>ลองใช้วิธีการยืนยันตัวตนวิธีอื่น</span></p>
              <button onClick={()=>setAppState("pass")} className='btn btn-primary'>ยืนยัน</button>
              
              
            </form>
            
            </div>
          </div>
          <br/>
          <br/>
          <Footer/>
          </>
  )
}

export default Email