import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import React, { useState, useEffect, useRef } from 'react'
import styles1 from './edit.module.css'
import Footer from "../../Footer/Footer"
import axios from 'axios';
import Navbar from '../../../Components/Navbar/nav';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { CKEditor } from 'ckeditor4-react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Select, Page, setOptions, localeTh } from '@mobiscroll/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Head from 'next/head'
import { FreeMode, Mousewheel, Pagination } from "swiper"
export default function addProduct() {
    // ==================================== Upload ============================================

  const [file, setFile] = useState([])
  const [previewImg, setPreviewImg] = useState()
  const [inputData, setInputData] = useState()
  const [category, setCategory] = useState('')
  const [ email , setEmail ] = useState();
  const [ status , setStatus ] = useState("notOk");
  const router = useRouter();

  useEffect(() => {
    if( localStorage.getItem("Email")){ setStatus("Ok")}
  },[] ); 
  useEffect(() => {
    if( localStorage.getItem("Email")){ 
      setEmail(localStorage.getItem("Email"))
    }
  },[] );
  function goToIndex(){
    router.push('/')
  }
  const saveFile = (e) => {
    
    
    if (parseInt(e.target.files.length) > 3) {
      alert(`เลือกได้ไม่เกิน ${3}ไฟล์`)
      }
    else{
      setFile([...e.target.files])
      setPreviewImg(e.target.files[0])}
}
  

  const upload = async (e) => {
    e.preventDefault()
    console.log(file)
    try{
      const myPromise = new Promise( async (resolve, reject) => {
        const listImgURL = []
        // [ Upload image ]
        file.forEach( async element => {
          
      const imgName = category + '-' + Date.now() + '-' + element.name?.replaceAll(' ','-')
      const imgURL = "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + 'Product/'  + imgName
      listImgURL.push(imgURL)
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
          Key: 'Product/' + imgName,
          Body: element
        },
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 10MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });
      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
      await parallelUploads3.done()
    })
      
      
      
      const axiosURL = 'http://localhost:3000/api/addProductClick'
      
      const detail = CKEDITOR.instances.detail.getData();
      console.log(category)
      console.log(detail)
        await axios.post( axiosURL , {
          Email:email,
          productName: inputData.productName,
          price: inputData.price,
          amount: inputData.amount,
          type: inputData.type,
          category: category,
          detail: detail ,
          img: listImgURL,
        }).then( res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'เพิ่มสินค้าสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(res.data)
          router.push('/Seller/Shop')
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
  
    if(status === "Ok"){
    return (
        <>
        <Head>
                <title>Ject Jobe</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
      <Navbar/>
      
      <div className={styles1.edit__container}> 
      <div className={styles1.edit__container__Upload}>
      <div className={styles1.fileDropArea}>
        <p className={styles1.alert}>*จำกัดอัปโหลดไม่เกิน 3 รูปเท่านั้น</p>
            <div className={styles1.imagesPreview} id='containerPreviewImg'>
            { previewImg && <img src={URL.createObjectURL(previewImg)} id='pre-img'/> }
            </div>
            <input className={styles1.inputField} type="file" name='file' accept="image/*"  multiple  onChange={saveFile} />
            <div className={styles1.fakeBtn}>Choose files</div>
            <div className={styles1.msg}>or drag and drop files here</div>
            <div className={styles1.msg}>Image Product No.1</div>
            <div className={styles1.listImages}>
              <Swiper
                  slidesPerView={3}
                  spaceBetween={0}
                  freeMode={true}
                  mousewheel={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[FreeMode, Mousewheel, Pagination]}
                  className="listImage"
                >
                {
                  
                  file.map( (element, index) => {
                    
                    return (
                      <SwiperSlide key={`list-img-${index}`}>
                        <div className={styles1.image}>
                          <img src={URL.createObjectURL(element)} onClick={ e => setPreviewImg(element) }/>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
          </div>
          
      </div>
      
      <div className={styles1.edit__container__form}>
      
            
          <form action="" className={styles1.form} onSubmit={upload}>
              <input placeholder="ชื่อสินค้า" type="text" className={styles1.input} name="productName" id="productName" required="" onChange={(e) => onChangeHandler(e.target)}/>
              <div className={styles1.col}>
              <input placeholder="ราคา" type="text" className={styles1.input} name="price" id="price" required="" onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="จำนวน" type="number" className={styles1.input} name="amount" id="amount" required="" onChange={(e) => onChangeHandler(e.target)} />
              </div>
              
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
}else {
  return (
    <div className={styles1.ErrorPage}>
       <h1>กรุณาเข้าสู่ระบบ</h1>
       <button type='submit' className='btn btn-primary' onMouseDown={()=> { goToIndex()} }>OK</button> 
    </div>
  )
}
}