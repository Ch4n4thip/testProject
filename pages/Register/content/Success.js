import {useContext} from 'react'
import { DataContext } from '../Verify'
import React from "react";
import styles1 from '../verify.module.css'
import Footer from "../../Footer/Footer"
import Image from 'next/image'
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi" ;

const Password = () => {
    const {setAppState} = useContext(DataContext)
      return (
          <>
        
        <div className={styles1.Verify__container}> 
        <div className={styles1.Verify__container__form}>
        
            <h1>สร้างบัญชีผู้ใช้สำเร็จ</h1>
            <span ><i><BiCheckCircle className={styles1.BiCheckCircle} /></i></span>
            <form action="" className={styles1.form}>
                {/* <input  type="text" class="input" required=""> */}
              
                {/* <Image 
                alt="checkmark"
                src={Checkmark}

                width={145}
                height={145}
            />  */}
            <div className={styles1.check}>
              <p>คุณสร้างบัญชีผู้ใช้ Ject Jobe ด้วย Email </p>
              <p>email@example.com สำเร็วแล้ว</p>
            </div> 
            <button type='submit' className='btn btn-primary'><Link href="/Login/Login">กลับไปที่หน้าหลัก</Link> </button> 
           
              
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