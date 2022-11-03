import Navbar from '../../Components/Navbar/nav'
import SideNav from '../SideNavBar/sideNav'
import Styles1 from './Profile.module.css'
import Foot from '../Footer/Footer'
import Popup from 'reactjs-popup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect , useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import Pro from "../../img/avatar3.png";
import Image from "next/image";



export default function Profile() {
 const router = useRouter();
 const [ name , setName ] = useState("");
 const [ emailLocal , setEmail ] = useState("");
 const [ role , setRole ] = useState("");
 const [ tel , setTel ] = useState("");
 const [ birthdate , setBirthDate ] = useState("");
 const [ gender , setGender ] = useState("");
 const [ address , setAddress ] = useState("");
 const [modalOpen, setModalOpen] = useState(false);
 const [file, setFile] = useState("");
 const [listProfile, setListProfile] = useState([]);
 

 const [ status , setStatus ] = useState("notOk");


 useEffect(() => {
  if( localStorage.getItem("Email")){ setStatus("Ok")}
},[] ); 

useEffect(() => {
 axios.get
},[] ); 

  
 useEffect(() => {
  if( localStorage.getItem("Email")){ 
    setName(localStorage.getItem("Name"))
    setEmail(localStorage.getItem("Email"))
    setRole(localStorage.getItem("Role"))
    setTel(localStorage.getItem("Tel"))
    setBirthDate(localStorage.getItem("BirthDate"))
    setGender(localStorage.getItem("Gender"))
    setAddress(localStorage.getItem("Address"))
  }
},[] );

const saveFile = (e) => {
  setFile(e.target.files[0]);
};
const uploadProfile = async (e) => {
  e.preventDefault();
  console.log(emailLocal);
  try {
    const myPromise = new Promise(async (resolve, reject) => {
      // [ Upload image ]
      
      const imgName = Date.now() + "-" + file?.name.replaceAll(" ", "-");
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: "ap-southeast-1",
          credentials: {
            accessKeyId: "AKIA6OGJIXFYLDIL42WS",
            secretAccessKey: "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",
          },
        }),
        params: {
          Bucket: "jectjobe",
          Key: "ProfileUser/" + imgName,
          Body: file,
        },
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });
      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
      await parallelUploads3.done();
      const NewName = document.querySelector('#newName').value
      const NewDate = document.querySelector('#newBirthDate').value
      const NewTel = document.querySelector('#newTel').value
      const NewGender = document.querySelector('#newGender').value  
      const axiosURL = "http://localhost:3000/api/getUser";
      const imgURL ="https://jectjobe.s3.ap-southeast-1.amazonaws.com/" + "ProfileUser/" + imgName;
      await axios
        .post(axiosURL, {
          email: emailLocal,
          img: imgURL,
          name: NewName,
          date : NewDate,
          tel : NewTel,
          gender : NewGender
          
        })
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          // window.location.reload();
          console.log(err.data);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

// Get Info User

const getListProfile = async () => {
  const URL =
    "http://localhost:3000/api/getUser?Email=" +
    localStorage.getItem("Email");
  await axios
    .get(URL)
    .then((result) => {
      console.log(result);
      setListProfile(result.data);
    })
    .catch((err) => {
      // Localhost ios issus
      console.log(err);
      axios
        .get("/api/getUser")
        .then((result) => {
          // setUserProfile( result.data )
          console.log([result.data]);
          setUserProfile([result.data]);
        })
        .catch((err) => {
          setListProfile([{ img: "", Email: err.message }]);
        });
    });
};
useEffect(() => {
  getListProfile();
}, []);
//End get Info User

 
  function goToIndex(){
    router.push('/')
  }

  // function EditProClick(){
  //   const url = 'http://localhost:3000/api/editProfileClick'
  //   const Email = email
  //   const NewName = document.querySelector('#newName').value
  //   const NewDate = document.querySelector('#newBirthDate').value
  //   const NewTel = document.querySelector('#newTel').value
  //   const NewGender = document.querySelector('#newGender').value    
   
  //   axios.post(url, {
  //     Email: Email ,
  //     name: NewName,
  //     date: NewDate,
  //     tel: NewTel,
  //     gender: NewGender

  //   }).then((response) => {
  //     window.location.reload(false)
      
  //     console.log(response.data)
  //   }).catch((error) => {
  //     router.push('./Profile')
  //     console.log(error.response.data)
  //   })
    
  // }

  function AddAddress(){
    const url = 'http://localhost:3000/api/newAddressClick'
    const NewAddress = document.querySelector('#newAddress').value

    axios.post(url,{
      Address: NewAddress
    }).then((response) => {
      router.push('./Profile')
    }).catch((error) => {

    })
  }

  if(status === "Ok"){
  return (
    
    <>
    <Navbar/>
    <SideNav/>
    <div className={Styles1.Container__Me}>
    <div className={Styles1.Container__Me__In}>
                          {(listProfile[0] === undefined) && 
                           
                            <div>
                              <Image
                                src={Pro}
                                alt="Profile"
                                objectFit="cover"
                              />
                            </div>
                          }
                          {listProfile[0] != undefined &&
                            listProfile.map((element) => {
                              console.log(element.img);
                              return (
                                <div className={Styles1.image}>
                                  <Image
                                    src={element.img}
                                    alt="Profile"
                                    objectFit="cover"
                                    width="200px"
                                    height="200px"
                                  />
                                </div>
                              );
                            })}
                        </div>

        <div className={Styles1.Container__Me__In}>
        {listProfile[0] != undefined &&
                          listProfile.map((element) => {
                           // console.log(element.Email);
                            return (
                              
                              <div className={Styles1.profile_header_info}>
                                
                                <h4 class="m-t-10 m-b-5">
                                  อีเมล : {element.email}
                                </h4>
                                <p class="m-b-10">
                                  ชื่อ : {element.name}
                                </p>
                                <p class="m-b-10">
                                  เบอร์โทรศัพท์ : {element.tel}
                                </p>
                                <p class="m-b-10">
                                  เพศ : {element.gender}
                                </p>
                                <p class="m-b-10">
                                  วันเกิด : {element.birthdate}
                                </p>
                              </div>
                            );
                          })}
            
                             </div>
                        <div className={Styles1.Container__Me__In}>
                        <button
                            type="button"
                            class="btn btn-info "
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            แก้ไข
                          </button>
                          <Modal
                            toggle={() => setModalOpen(!modalOpen)}
                            isOpen={modalOpen}
                          >
                            <div className=" modal-header">
                              <h5
                                className=" modal-title"
                                id="exampleModalLabel"
                              >
                                Update Profile
                              </h5>
                              <button
                                aria-label="Close"
                                className=" close"
                                type="button"
                                onClick={() => setModalOpen(!modalOpen)}
                              >
                                <span aria-hidden={true}>×</span>
                              </button>
                            </div>
                            <ModalBody>
                              <div className={Styles1.fileDropArea}>
                                <div
                                  className={Styles1.imagesPreview}
                                  id="containerPreviewImg"
                                >
                                  {file && (
                                    <img
                                      src={URL.createObjectURL(file)}
                                      id="pre-img"
                                    />
                                  )}
                                </div>
                                <input
                                  className={Styles1.inputField}
                                  type="file"
                                  name="file"
                                  onChange={saveFile}
                                />
                                <div className={Styles1.fakeBtn}>
                                  Choose Image
                                </div>
                                <div className={Styles1.msg}>
                                  or drag and drop image here
                                </div>
                                    

                            
                                  

                              </div>
                              
                              {/* edit from here */}
                              <div className={Styles1.In__popup}>
                            <form action='./Profile' method="" className={Styles1.form}>
                              <input type="text" id='newName' placeholder=' โปรดใส่ชื่อใหม่' required/>
                              <input type="date" id='newBirthDate' placeholder=' โปรดใส่วันที่เกิด' required/>
                              <input type="tel"  id="newTel" placeholder='โปรดใส่หมายเลขโทรศัพท์'  required/>
                              <div className={Styles1.form__gender}>
                                <label for="newGender" className={Styles1.gender}>เพศ : </label>
                                <select name="cars" id="newGender" className={Styles1.gender__select}>
                                  <option value="male" className={Styles1.gender__option}>ชาย</option>
                                  <option value="female" className={Styles1.gender__option}>หญิง</option>
                                  <option value="none" className={Styles1.gender__option}>ไม่ระบุ</option>
                                </select>
                              </div>
                              
                            </form> 
                             </div>  
                             
                             {/* edit end  here */}
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={() => setModalOpen(!modalOpen)}
                              >
                                Close
                              </Button>
                              <Button
                                color="primary"
                                type="button"
                                onClick={(e) => uploadProfile(e)}
                              >
                                Save changes
                              </Button>
                            </ModalFooter>
                          </Modal>
                        
                          <button>คูปองของฉัน</button>
                          </div>
                      </div>
                      <div className={Styles1.Container__Info}>
                          <h1>ที่อยู่ของฉัน</h1>
                          <div className={Styles1.Container__info__button}>
                          <button
                            type="button"
                            class="btn btn-info "
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            เพิ่มที่อยู่
                          </button>
                          <Modal
                            toggle={() => setModalOpen(!modalOpen)}
                            isOpen={modalOpen}
                          >
                            <div className=" modal-header">
                              <h5
                                className=" modal-title"
                                id="exampleModalLabel"
                              >
                                Add Address
                              </h5>
                              <button
                                aria-label="Close"
                                className=" close"
                                type="button"
                                onClick={() => setModalOpen(!modalOpen)}
                              >
                                <span aria-hidden={true}>×</span>
                              </button>
                            </div>
                            <ModalBody>
                                        
                              {/* edit from here */}
                              <div className={Styles1.In__popup}>
                            <form action='./Profile' method="" className={Styles1.form}>
                            <input type="text" id='newAddress' placeholder=' โปรดใส่ที่อยู่' required/>
                            <button type='submit' className='btn btn-primary' onMouseDown={()=> {AddAddress()} }>ยืนยัน</button> 
                              
                            </form> 
                             </div>  
                             
                             {/* edit end  here */}
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={() => setModalOpen(!modalOpen)}
                              >
                                Close
                              </Button>
                              <Button
                                color="primary"
                                type="button"
                                onClick={(e) => uploadProfile(e)}
                              >
                                Save changes
                              </Button>
                            </ModalFooter>
                          </Modal>
        </div>
        <h1>{address}</h1>
    </div>   
    <Foot/>
    </> 
  
  )
  
}else {
  return (
    <div className={Styles1.ErrorPage}>
       <h1>กลับสู่หน้าหลัก</h1>
       <button type='submit' className='btn btn-primary' onMouseDown={()=> { goToIndex()} }>OK</button> 
    </div>
  )
}
}