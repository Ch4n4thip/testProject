import {useContext} from 'react'
import { DataContext } from '../Verify'
import Link from "next/link";
import React , {useState} from "react";

import styles1 from '../verify.module.css'
import OneTime from "../OneTime";
import Footer from "../../Footer/Footer"
const Password = () => {
    const {setAppState} = useContext(DataContext)
      return (
          <>
        
        <div className={styles1.Verify__container}> 
        <div className={styles1.Verify__container__form}>
            
            <h1>ตั้งรหัสผ่าน</h1>
            <h3>คุณมาถึงขั้นตอนสุดท้ายแล้ว กรุณาตั้งรหัสผ่าน</h3>
            <form action="" className={styles1.form}>
                <input placeholder="Password" type="password" className={styles1.input} name="pass" required=""/>
            <div className={styles1.required}>
              <p >ตัวพิมพ์เล็กอย่างน้อย 1 ตัว</p>
              <p>ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว</p>
              <p>ตัวอักษรภาษาอังกฤษ 8-16 ตัวอักษร</p>
              <p>สามารถใช้ได้เฉพาะตัวอักษรภาษาอังกฤษ ตัวเลขอารบิก และเครื่องหมายปกติ</p>
              <br/>
              <button onClick={()=>setAppState("suc")} className='btn btn-primary'>ยืนยัน</button>
            </div> 
              
            </form>
            
            </div>
          </div>
          <br/>
          <br/>
          <Footer/>
          </>
  )
}

export default Password