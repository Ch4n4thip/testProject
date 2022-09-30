
import {useContext} from 'react'
import Link from "next/link";
import React , {useState} from "react";
import styles1 from './kyc.module.css'
import Footer from "../../Footer/Footer"
import axios from 'axios';
import Navbar from '../../../Components/Navbar/nav';

export default function userKyc() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();


  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }



  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();

    for ( const file of fileInput.files ) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch('https://api.cloudinary.com/v1_1/dp7jpb8ty/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());
    console.error(data);
    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  

    return (
        <>
      <Navbar/>
      <div className={styles1.kyc__container}> 
      <div className={styles1.kyc__container__Upload}>
      <form className={styles1.Upload} method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <img src={imageSrc} />
          
          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </div>
      <div className={styles1.kyc__container__form}>
      
            
          <form action="" className={styles1.form}>
              <input placeholder="ชื่อจริง-นามสกุล" type="text" className={styles1.input} name="pass" required=""/>
              <input placeholder="ชื่อร้าน" type="text" className={styles1.input} name="pass" required=""/>
              <input placeholder="เลขบัตรประชาชน" type="text" className={styles1.input} name="pass" required=""/>
              <input placeholder="ธนาคาร" type="text" className={styles1.input} name="pass" required=""/>
              <input placeholder="เลขบัญชีธนาคาร" type="text" className={styles1.input} name="pass" required=""/>
              <input placeholder="เบอร์โทรศัพท์" type="text" className={styles1.input} name="pass" required=""/>
              <textarea placeholder="ที่อยู่ตามบัตรประชาชน" type="area" className={styles1.input} name="pass" required=""/>

              <div className={styles1.buttonForm}>
            <button >ยืนยัน</button>
            </div>
          
            
          </form>
          
          </div>
        </div>

        </>
)
}

