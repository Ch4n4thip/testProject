import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import React, { useState, useEffect, useRef } from 'react'
import styles1 from './edit.module.css'
import Footer from "../../Footer/Footer"
import axios from 'axios';
import Navbar from '../../../Components/Navbar/nav';
import Swal from 'sweetalert2'
import {Router, useRouter} from 'next/router'
import { CKEditor } from 'ckeditor4-react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Select, Page, setOptions, localeTh } from '@mobiscroll/react';

export default function EditStock() {
    // ==================================== Upload ============================================

  const [file, setFile] = useState('')
  const [Product2, setProduct2] = useState('')
  const [Product3, setProduct3] = useState('')
  const [inputData, setInputData] = useState()
  const [category, setCategory] = useState('')
  const saveFile = (e) => {
    setFile(e.target.files[0])

    // reset preview div
    document.getElementById('containerPreviewImg').innerHTML = ""
    var reader = new FileReader()
    reader.addEventListener('loadend', function() {
      var image = new Image()
      image.title  = e.target.files[0].name
      image.src    = this.result
      image.id     = 'img-1'
      document.querySelector('#containerPreviewImg').appendChild(image)
    })
    reader.readAsDataURL(e.target.files[0])
  }
  const saveFileProduct2 = (a) => {
    setProduct2(a.target.files[0])

    // reset preview div
    document.getElementById('containerPreviewProduct2').innerHTML = ""
    var reader = new FileReader()
    reader.addEventListener('loadend', function() {
      var image = new Image()
      image.title  = a.target.files[0].name
      image.src    = this.result
      image.id     = 'img-2'
      document.querySelector('#containerPreviewProduct2').appendChild(image)
    })
    reader.readAsDataURL(a.target.files[0])
  }
  const saveFileProduct3 = (a) => {
    setProduct3(a.target.files[0])

    // reset preview div
    document.getElementById('containerPreviewProduct3').innerHTML = ""
    var reader = new FileReader()
    reader.addEventListener('loadend', function() {
      var image = new Image()
      image.title  = a.target.files[0].name
      image.src    = this.result
      image.id     = 'img-3'
      document.querySelector('#containerPreviewProduct3').appendChild(image)
    })
    reader.readAsDataURL(a.target.files[0])
  }
 

  const upload = async (e) => {
    e.preventDefault()
    console.log(file)
    try{
      const imgName = Date.now() + '-' + file?.name?.replaceAll(' ','-')
      const imgNameProduct2 = Date.now() + '-' + Product2?.name?.replaceAll(' ','-')
      const imgNameProduct3 = Date.now() + '-' + Product3?.name?.replaceAll(' ','-')
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: "ap-southeast-1",
          credentials: {
            accessKeyId: "AKIA6OGJIXFYLDIL42WS",
            secretAccessKey: "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"
          }
        })|| new S3Client({}),
        params: { 
          Bucket: "jectjobe",
          Key: 'EditStock/' + 'Product1' + imgName,
          Key: 'EditStock/' + 'Product2/' + imgNameProduct2,
          Key: 'EditStock/' + 'Product3/' + imgNameProduct3,
          Body: file
        },
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 10MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });
      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
      await parallelUploads3.done()
      const axiosURL = 'http://localhost:3000/api/editStockClick'
      const imgURL = "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + '/EditStock/' + 'Product1/' + imgName
      const imgURLProduct2 = "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + '/EditStock/' + 'Product2/' + imgNameProduct2
      const imgURLProduct3 = "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + '/EditStock/' + 'Product3/' + imgNameProduct3
      const detail = CKEDITOR.instances.detail.getData();
      console.log(category)
      console.log(detail)
        await axios.post( axiosURL , {
            
          productName: inputData.productName,
          price: inputData.price,
          amount: inputData.amount,
          type: inputData.type,
          category: category,
          detail: detail ,
          img: imgURL,
          imgProduct2: imgURLProduct2,
          imgProduct3: imgURLProduct3
        }).then( res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'เพิ่มสินค้าสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(res.data)
        }).catch( err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err.response.data)
        })
      
      
    }catch (e){
      console.log(e);
    }
    }
    const onChangeHandler = (event) => {
      const {name, value} = event
      setInputData((prev) => {
        return {...prev, [name]: value}
      })
    }
    const onCategoryChange = (ev) => {
      setCategory(ev.value);
  }
// =================================== Multiple Select ============================================
      setOptions({
        locale: localeTh,
        theme: 'ios',
        themeVariant: 'light'
      });    
    const myData = [
        { text: 'เลือกทั้งหมด', value: 'all' },
      { text: 'กระเป๋า', value: 'bag' },
      { text: 'กล้องและอุปกรณ์ถ่ายภาพ', value: 'camera' },
      { text: 'กีฬาและกิจกรรมกลางแจ้ง', value: 'sport' },
      { text: 'ของเล่น สินค้าแม่และเด็ก', value: 'toys' },
      { text: 'ความงามและของใช้ส่วนตัว', value: 'beauty' },
      { text: 'คอมพิวเตอร์และแล็ปท็อป', value: 'computer' },
      { text: 'นาฬิกาและแว่นตา', value: 'watch' },
      { text: 'มือถือและอุปกรณ์เสริม', value: 'mobile' },
      { text: 'ยานยนต์', value: 'car' },
      { text: 'รองเท้าผู้ชาย/ผู้หญิง', value: 'shoes' },
      { text: 'สัตว์เลี้ยง', value: 'pet' },
      { text: 'สื่อบันเทิงภายในบ้าน', value: 'entertainment' },
      { text: 'อาหารเครื่องดื่มและผลิตภัณฑ์สุขภาพ', value: 'food' },
      { text: 'เกมและอุปกรณ์เสริม', value: 'game' },
      { text: 'เครื่องประดับ', value: 'jewelry' },
      { text: 'เครื่องเขียน หนังสือ และ ดนตรี', value: 'stationery' },
      { text: 'เครื่องใช้ภายในบ้าน', value: 'home' },
      { text: 'เสื้อผ้าผู้ชาย/ผู้หญิง', value: 'clothes' },
    ];
    
    const myDefault = 'all';
    return (
        <>
      <Navbar/>
      
      <div className={styles1.edit__container}> 
      <div className={styles1.edit__container__Upload}>
      <div className={styles1.fileDropArea}>
            <div className={styles1.imagesPreview} id='containerPreviewImg'></div>
            <input className={styles1.inputField} type="file" name='file' accept="image/*" onChange={saveFile} />
            <div className={styles1.fakeBtn}>Choose files</div>
            <div className={styles1.msg}>or drag and drop files here</div>
            <div className={styles1.msg}>Image Product No.1</div>
          </div>
          <div className={styles1.UploadImg}>
        <label htmlFor="Upload" className="form-label">Image Product No.2</label>
        <input className="form-control" type="file" id="UploadProduct2" name='UploadProduct2' accept="image/*" onChange={saveFileProduct2}></input>
        <div className={styles1.containerPreview} id='containerPreviewProduct2'></div>
      </div>
      <div className={styles1.UploadImg}>
        <label htmlFor="Upload" className="form-label">Image Product No.3</label>
        <input className="form-control" type="file" id="UploadProduct3" name='UploadProduct3' accept="image/*" onChange={saveFileProduct3}></input>
        <div className={styles1.containerPreview} id='containerPreviewProduct3'></div>
      </div>
      </div>
      
      <div className={styles1.edit__container__form}>
      
            
          <form action="" className={styles1.form} onSubmit={upload}>
              <input placeholder="ชื่อสินค้า" type="text" className={styles1.input} name="productName" id="productName" required="" onChange={(e) => onChangeHandler(e.target)}/>
              <div className={styles1.col}>
              <input placeholder="ราคา" type="text" className={styles1.input} name="price" id="price" required="" onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="จำนวน" type="number" className={styles1.input} name="amount" id="amount" required="" onChange={(e) => onChangeHandler(e.target)} />
              </div>
              <input placeholder="ประเภท" type="text" className={styles1.input} name="type" id="type" required="" onChange={(e) => onChangeHandler(e.target)} />
              <div >
              

          <Select
          // name="category"
          // id="category"
              data={myData}
              defaultSelection={myDefault}
              placeholder="เลือกหมวดหมู่สินค้า"
              onChange={onCategoryChange}
              // value={Category}
          />
        </div>
            <div >
              <h4>รายละเอียดสินค้า</h4>
              <CKEditor name='detail' id='detail'
              
              />
            </div>
            <div className={styles1.buttonForm}>
            <button type="submit">ยืนยัน</button>
            </div>
            
            
          </form>
          
          </div>
          
      
        </div>
        
        <Footer/>

        </>
)
}

