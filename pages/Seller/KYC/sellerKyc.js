import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import  {useState, useEffect} from "react";
import styles1 from './kyc.module.css'
import Footer from "../../Footer/Footer"
import axios from 'axios';
import Navbar from '../../../Components/Navbar/nav';
import Swal from 'sweetalert2'
import { FreeMode, Mousewheel, Pagination } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter} from 'next/router'

export default function userKyc() {
  const [file, setFile] = useState([])
  const [previewImg, setPreviewImg] = useState()
  const [inputData, setInputData] = useState()
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
          
      const changeEmail = email.replaceAll('.','')
      const imgName = changeEmail + '-' + Date.now() + '-' + element.name?.replaceAll(' ','-')
      const imgURL = "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + 'Kyc/'  + imgName
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
          Key: 'Kyc/' + imgName,
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
      const axiosURL = 'http://localhost:3000/api/kycClick'
        await axios.post( axiosURL , {
          Email: email,
          fullName: inputData.fullName,
          shopName: inputData.shopName,
          cardPCC: inputData.cardPCC,
          bankName:  inputData.bankName,
          bookBank: inputData.bookBank,
          phone: inputData.phone,
          address: inputData.address,
          img: listImgURL,
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
    if(status === "Ok"){
    return (
        <>
      <Navbar/>
      
      <div className={styles1.kyc__container}> 
      <div className={styles1.kyc__container__Upload}>
      <div className={styles1.fileDropArea}>
            <div className={styles1.imagesPreview} id='containerPreviewImg'>
            { previewImg && <img src={URL.createObjectURL(previewImg)} id='pre-img'/> }
            </div>
            <input className={styles1.inputField} type="file" name='file' accept=".jpg,.png,.pdf"  multiple  onChange={saveFile} />
            <div className={styles1.fakeBtn}>Choose files</div>
            <div className={styles1.msg}>or drag and drop files here</div>
            <p className={styles1.alert}>*จำกัดอัปโหลดไม่เกิน 3 รูปเท่านั้น</p>
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
          <p className={styles1.text}>*รองรับไฟล์ PNG, JPG, PDF เท่านั้น</p>
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
          <input placeholder={email} type="text" className={styles1.input} name="Email" id="Email" disabled/>
              <input placeholder="ชื่อจริง-นามสกุล" type="text" className={styles1.input} name="fullName" id="fullName" required onChange={(e) => onChangeHandler(e.target)}/>
              <input placeholder="ชื่อร้าน" type="text" className={styles1.input} name="shopName" id="shopName" required onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="เลขบัตรประชาชน" type="text" className={styles1.input} name="cardPCC" id="cardCPP" required onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="ธนาคาร" type="text" className={styles1.input} name="bankName" id="bankName" required onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="เลขบัญชีธนาคาร" type="text" className={styles1.input} name="bookBank" id="bookBank" required onChange={(e) => onChangeHandler(e.target)} />
              <input placeholder="เบอร์โทรศัพท์" type="text" className={styles1.input} name="phone" id="phone" required onChange={(e) => onChangeHandler(e.target)} />
              <textarea placeholder="ที่อยู่ตามบัตรประชาชน" type="area" className={styles1.input} name="address" id="address" required="" onChange={(e) => onChangeHandler(e.target)} />

              <div className={styles1.buttonForm}>
            <button type="submit">ยืนยัน</button>
            </div>
          
            
          </form>
          
          </div>
        </div>
        <Footer id="foot" name="foot"/>

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

