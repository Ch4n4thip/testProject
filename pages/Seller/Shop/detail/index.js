// import Navbar from "../../../../Components/Navbar/nav";
// import SideNav from "../../../SideNavBar/sideNav";
// import styles1 from "./detail.module.css";
// import Foot from "../../../Footer/Footer";
// import Popup from "reactjs-popup";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Pro from "../../../../img/avatar3.png";
// import "bootstrap/dist/css/bootstrap.css";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
// import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client, S3 } from "@aws-sdk/client-s3";

// export default function Profile() {
//   const router = useRouter();
//   const [email, setEmail] = useState();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [status, setStatus] = useState("notOk");
//   const [file, setFile] = useState("");
//   const [listProfile, setListProfile] = useState([]);
//   const [userProfile, setUserProfile] = useState([]);

//   const saveFile = (e) => {
//     setFile(e.target.files[0]);
//   };
//   const uploadProfile = async (e) => {
//     e.preventDefault();
//     console.log(email);
//     try {
      
//   const getListProfile = async () => {
//     const URL =
//       "http://localhost:3000/api/userSeller?Email=" +
//       localStorage.getItem("Email");
//     await axios
//       .get(URL)
//       .then((result) => {
//         console.log(result);
//         setListProfile(result.data);
//       })
//       .catch((err) => {
//         // Localhost ios issus
//         console.log(err);
//         axios
//           .get("/api/userSeller")
//           .then((result) => {
//             // setListProfile( result.data )
//             console.log(result.data);
//             setListProfile(result.data);
//           })
//           .catch((err) => {
//             setListProfile([{ img: "", Email: err.message }]);
//           });
//       });
//   };
//   useEffect(() => {
//     getListProfile();
//   }, []);
//   const getUserProfile = async () => {
//     const URL =
//       "http://localhost:3000/api/kycClick?Email=" +
//       localStorage.getItem("Email");
//     await axios
//       .get(URL)
//       .then((result) => {
//         console.log(result);
//         setUserProfile([result.data]);
//       })
//       .catch((err) => {
//         // Localhost ios issus
//         console.log(err);
//         axios
//           .get("/api/kycClick")
//           .then((result) => {
//             // setUserProfile( result.data )
//             console.log([result.data]);
//             setUserProfile([result.data]);
//           })
//           .catch((err) => {
//             setUserProfile([{ img: "", Email: err.message }]);
//           });
//       });
//   };
//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   console.log(listProfile);
//   useEffect(() => {
//     if (localStorage.getItem("Email")) {
//       setStatus("Ok");
//     }
//   }, []);

//   useEffect(() => {
//     if (localStorage.getItem("Email")) {
      
//       setEmail(localStorage.getItem("Email"));

//     }
//   }, []);

//   function goToIndex() {
//     router.push("/");
//   }

  
//   if (status === "Ok") {
//     return (
//       <>
//         <Navbar />
//         {/* <SideNav/> */}
//         <div className={styles1.container}>
//           <div className={styles1.contentContainer}>
//             <div className={styles1.row}>
//               <div className={styles1.col}>
//                 <div id="content" className={styles1.content}>
//                   <div className={styles1.profile}>
//                     <div className={styles1.profile_header}>
//                       <div className={styles1.profile_header_cover}></div>
//                       <div className={styles1.profile_header_content}>
//                         <div className={styles1.profile_header_img}>
//                           {(listProfile[0] === undefined) && 
                           
//                             <div>
//                               <Image
//                                 src={Pro}
//                                 alt="Profile"
//                                 objectFit="cover"
//                               />
//                             </div>
//                           }
//                           {listProfile[0] != undefined &&
//                             listProfile.map((element) => {
//                               console.log(element.img);
//                               return (
//                                 <div className={styles1.image}>
//                                   <Image
//                                     src={element.img}
//                                     alt="Profile"
//                                     objectFit="cover"
//                                     width="105px"
//                                     height="109px"
//                                   />
//                                 </div>
//                               );
//                             })}
//                         </div>
//                         {userProfile[0] != undefined &&
//                           userProfile.map((element) => {
//                             console.log(element[0].fullName);
//                             return (
//                               <div className={styles1.profile_header_info}>
//                                 <h4 class="m-t-10 m-b-5">
//                                   ???????????????????????? : {element[0].shopName}
//                                 </h4>
//                                 <p class="m-b-10">
//                                   ?????????????????????????????? : {element[0].addDate}
//                                 </p>
//                                 <p class="m-b-10">
//                                   ??????????????????????????????????????? : {element[0].phone}
//                                 </p>
//                                 <p class="m-b-10">
//                                   ????????????????????? : {element[0].address}
//                                 </p>
//                               </div>
//                             );
//                           })}

//                         <div className={styles1.imagesButton}>
//                           {/* <a href="#" class="btn btn-sm btn-info text-white mb-2">Edit Profile</a> */}
//                           <button
//                             type="button"
//                             class="btn btn-info "
//                             onClick={() => setModalOpen(!modalOpen)}
//                           >
//                             ????????????????????????
//                           </button>
//                           <Modal
//                             toggle={() => setModalOpen(!modalOpen)}
//                             isOpen={modalOpen}
//                           >
//                             <div className=" modal-header">
//                               <h5
//                                 className=" modal-title"
//                                 id="exampleModalLabel"
//                               >
//                                 Upload Profile
//                               </h5>
//                               <button
//                                 aria-label="Close"
//                                 className=" close"
//                                 type="button"
//                                 onClick={() => setModalOpen(!modalOpen)}
//                               >
//                                 <span aria-hidden={true}>??</span>
//                               </button>
//                             </div>
//                             <ModalBody>
//                               <div className={styles1.fileDropArea}>
//                                 <div
//                                   className={styles1.imagesPreview}
//                                   id="containerPreviewImg"
//                                 >
//                                   {file && (
//                                     <img
//                                       src={URL.createObjectURL(file)}
//                                       id="pre-img"
//                                     />
//                                   )}
//                                 </div>
//                                 <input
//                                   className={styles1.inputField}
//                                   type="file"
//                                   name="file"
//                                   onChange={saveFile}
//                                 />
//                                 <div className={styles1.fakeBtn}>
//                                   Choose files
//                                 </div>
//                                 <div className={styles1.msg}>
//                                   or drag and drop files here
//                                 </div>
//                               </div>
//                             </ModalBody>
//                             <ModalFooter>
//                               <Button
//                                 color="secondary"
//                                 type="button"
//                                 onClick={() => setModalOpen(!modalOpen)}
//                               >
//                                 Close
//                               </Button>
//                               <Button
//                                 color="primary"
//                                 type="button"
//                                 onClick={(e) => uploadProfile(e)}
//                               >
//                                 Save changes
//                               </Button>
//                             </ModalFooter>
//                           </Modal>
//                         </div>
//                         {/* </div> */}
//                         {/* <div className={styles1.ButtonCss}>
                         
//                           <button
//                             type="button"
//                             class="btn btn-info "
//                             onClick={() => setModalOpen(!modalOpen)}
//                           >
//                             ????????????????????????????????????????????????
//                           </button>
//                           <Modal
//                             toggle={() => setModalOpen(!modalOpen)}
//                             isOpen={modalOpen}
//                           >
//                             <div className=" modal-header">
//                               <h5
//                                 className=" modal-title"
//                                 id="exampleModalLabel"
//                               >
//                                 ????????????????????????????????????????????????
//                               </h5>
//                               <button
//                                 aria-label="Close"
//                                 className=" close"
//                                 type="button"
//                                 onClick={() => setModalOpen(!modalOpen)}
//                               >
//                                 <span aria-hidden={true}>??</span>
//                               </button>
//                             </div>
//                             <ModalBody>
//                               <p>????????????????????????????????????</p>
//                               <div className={styles1.CssInline}>
//                                 <div class="form-check">
//                                   <input
//                                     class="form-check-input"
//                                     type="checkbox"
//                                     value=""
//                                     id="COD"
//                                   />
//                                   <label class="form-check-label" for="COD">
//                                     COD (?????????????????????????????????????????????)
//                                   </label>
//                                 </div>
//                                 <div class="form-check">
//                                   <input
//                                     class="form-check-input"
//                                     type="checkbox"
//                                     value=""
//                                     id="Bank"
//                                   />
//                                   <label class="form-check-label" for="Bank">
//                                     ??????????????????????????????????????????????????????????????????
//                                   </label>
//                                 </div>
//                                 <div class="form-check">
//                                   <input
//                                     class="form-check-input"
//                                     type="checkbox"
//                                     value=""
//                                     id="Credit"
//                                   />
//                                   <label class="form-check-label" for="Credit">
//                                     ??????????????????????????????/???????????????????????????
//                                   </label>
//                                 </div>
//                               </div>

//                               <p className={styles1.Select}>???????????????????????????????????????</p>
//                               <div className={styles1.CssInline}>
//                                 <div class="form-check">
//                                   <input
//                                     class="form-check-input"
//                                     type="checkbox"
//                                     value=""
//                                     id="Kerry"
//                                   />
//                                   <label class="form-check-label" for="Kerry">
//                                     Kerry
//                                   </label>
//                                 </div>
//                                 <div class="form-check">
//                                   <input
//                                     class="form-check-input"
//                                     type="checkbox"
//                                     value=""
//                                     id="ThaiPost"
//                                   />
//                                   <label
//                                     class="form-check-label"
//                                     for="ThaiPost"
//                                   >
//                                     ???????????????????????????
//                                   </label>
//                                 </div>
//                               </div>
//                             </ModalBody>
//                             <ModalFooter>
//                               <Button
//                                 color="secondary"
//                                 type="button"
//                                 onClick={() => setModalOpen(!modalOpen)}
//                               >
//                                 Close
//                               </Button>
//                               <Button
//                                 color="primary"
//                                 type="button"
//                                 onClick={(e) => uploadProfile(e)}
//                               >
//                                 Save changes
//                               </Button>
//                             </ModalFooter>
//                           </Modal>
//                         </div> */}

//                         <div className={styles1.ButtonCss}>
//                           <Button color="info" type="button">
//                             ??????????????????????????????????????????
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Foot />
//       </>
//     );
//   } else {
//     return (
//       <div className={styles1.ErrorPage}>
//         <h1>?????????????????????????????????????????????</h1>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onMouseDown={() => {
//             goToIndex();
//           }}
//         >
//           OK
//         </button>
//       </div>
//     );
//   }
// }
