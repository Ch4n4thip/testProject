import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import  {useState, useEffect} from "react";
import styles1 from './kyc.module.css'
import Footer from "../../Footer/Footer"
import axios from 'axios';
import Navbar from '../../../Components/Navbar/nav';
import Swal from 'sweetalert2'

import {Router, useRouter} from 'next/router'

export default function userKyc() {
  const [file, setFile] = useState('')
  const [fileBank, setFileBank] = useState('')
  const [inputData, setInputData] = useState()

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
  const saveFileBank = (a) => {
    setFileBank(a.target.files[0])

    // reset preview div
    document.getElementById('containerPreviewImgBank').innerHTML = ""
    var reader = new FileReader()
    reader.addEventListener('loadend', function() {
      var image = new Image()
      image.title  = a.target.files[0].name
      image.src    = this.result
      image.id     = 'img-2'
      document.querySelector('#containerPreviewImgBank').appendChild(image)
    })
    reader.readAsDataURL(a.target.files[0])
  }


  const upload = async (e) => {
    e.preventDefault()
    console.log(file)
    try{
      const imgName = Date.now() + '-' + file?.name?.replaceAll(' ','-')
      const imgNameBank = Date.now() + '-' + fileBank?.name?.replaceAll(' ','-')
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
          Key: 'KYCSeller/' + 'Card/' + imgName,
          Key: 'KYCSeller/' + 'BookBank/' + imgNameBank,
          Body: file
        },
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 10MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });
      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
      await parallelUploads3.done()
      const axiosURL = 'http://localhost:3000/api/kycClick'
      const imgURL = "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + '/KYCSeller/' + 'Card/' + imgName
      const imgURLBank = "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + '/KYCSeller/' + 'BookBank/' + imgNameBank
        await axios.post( axiosURL , {
          fullName: inputData.fullName,
          shopName: inputData.shopName,
          cardPCC: inputData.cardPCC,
          bankName:  inputData.bankName,
          bookBank: inputData.bookBank,
          phone: inputData.phone,
          address: inputData.address,
          img: imgURL,
          imgBank: imgURLBank
        }).then( res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'รอยืนยันจากผู้ดูแลระบบ',
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
    return (
        <>
      <Navbar/>
      
      <div className={styles1.kyc__container}> 
      <div className={styles1.kyc__container__Upload}>
      <div className={styles1.fileDropArea}>
            <div className={styles1.imagesPreview} id='containerPreviewImg'></div>
            <input className={styles1.inputField} type="file" id="Upload" name='Upload' onChange={saveFile} />
            <div className={styles1.fakeBtn}>Choose files</div>
            <div className={styles1.msg}>or drag and drop files here</div>
          </div>
          <div className={styles1.fileDropArea}>
            <div className={styles1.imagesPreview} id='containerPreviewImgBank'></div>
            <input className={styles1.inputField} type="file" id="UploadBank" name='UploadBank' onChange={saveFileBank} />
            <div className={styles1.fakeBtn}>Choose files</div>
            <div className={styles1.msg}>or drag and drop files here</div>
      </div>
      {/* <div className={styles1.UploadImg}>
      
        <label htmlFor="Upload" className="form-label">รูปบัตรประชาชน</label>
        <input className="form-control" type="file" id="Upload" name='Upload' onChange={saveFile}></input>
        <div className={styles1.containerPreview} id='containerPreviewImg'></div>
      </div>
      <div className={styles1.UploadImg}>
      
        <label htmlFor="UploadBank" className="form-label">รูปหน้าบัญชีธนาคาร</label>
        <input className="form-control" type="file" id="UploadBank" name='UploadBank'onChange={saveFileBank} ></input>
        <div className={styles1.containerPreview} id='containerPreviewImgBank'></div>
      </div> */}
      </div>
      <div className={styles1.kyc__container__form}>
      
            
          <form action="" className={styles1.form} onSubmit={upload}>
              <input placeholder="ชื่อจริง-นามสกุล" type="text" className={styles1.input} name="fullName" id="fullName" required="" onChange={(e) => onChangeHandler(e.target)}/>
              <input placeholder="ชื่อร้าน" type="text" className={styles1.input} name="shopName" id="shopName" required="" onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="เลขบัตรประชาชน" type="text" className={styles1.input} name="cardPCC" id="cardCPP" required="" onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="ธนาคาร" type="text" className={styles1.input} name="bankName" id="bankName" required="" onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="เลขบัญชีธนาคาร" type="text" className={styles1.input} name="bookBank" id="bookBank" required="" onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="เบอร์โทรศัพท์" type="text" className={styles1.input} name="phone" id="phone" required="" onChange={(e) => onChangeHandler(e.target)} />
              <textarea placeholder="ที่อยู่ตามบัตรประชาชน" type="area" className={styles1.input} name="address" id="address" required="" onChange={(e) => onChangeHandler(e.target)} />

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

