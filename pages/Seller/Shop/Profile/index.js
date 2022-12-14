import Navbar from "../../../../Components/Navbar/nav";
import SideNav from "../../../SideNavBar/sideNav";
import styles1 from "./profile.module.css";
import Foot from "../../../Footer/Footer";
import Popup from "reactjs-popup";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pro from "../../../../img/avatar3.png";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);
  const [status, setStatus] = useState("notOk");
  const [file, setFile] = useState("");
  const [listProfile, setListProfile] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadProfile = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const myPromise = new Promise(async (resolve, reject) => {
        // [ Upload image ]
        var changeEmail = email.replaceAll(".", "");

        const imgName = Date.now() + "-" + file.name.replaceAll(" ", "-");
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
            Key: "ProfileShop/" + imgName,
            Body: file,
          },
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        });
        parallelUploads3.on("httpUploadProgress", (progress) => {
          console.log(progress);
        });
        await parallelUploads3.done();

        const axiosURL = "http://localhost:3000/api/userSeller";
        const imgURL =
          "https://jectjobe.s3.ap-southeast-1.amazonaws.com/" +
          "ProfileShop/" +
          imgName;
        await axios
          .post(axiosURL, {
            Email: email,
            img: imgURL,
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
  const getListProfile = async () => {
    const URL =
      "http://localhost:3000/api/userSeller?Email=" +
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
          .get("/api/userSeller")
          .then((result) => {
            // setListProfile( result.data )
            console.log(result.data);
            setListProfile(result.data);
          })
          .catch((err) => {
            setListProfile([{ img: "", Email: err.message }]);
          });
      });
  };
  useEffect(() => {
    getListProfile();
  }, []);
  const getUserProfile = async () => {
    const URL =
      "http://localhost:3000/api/kycClick?Email=" +
      localStorage.getItem("Email");
    await axios
      .get(URL)
      .then((result) => {
        console.log(result);
        setUserProfile([result.data]);
      })
      .catch((err) => {
        // Localhost ios issus
        console.log(err);
        axios
          .get("/api/kycClick")
          .then((result) => {
            // setUserProfile( result.data )
            console.log([result.data]);
            setUserProfile([result.data]);
          })
          .catch((err) => {
            setUserProfile([{ img: "", Email: err.message }]);
          });
      });
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  console.log(listProfile);
  useEffect(() => {
    if (localStorage.getItem("Email")) {
      setStatus("Ok");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("Email")) {
      
      setEmail(localStorage.getItem("Email"));

    }
  }, []);

  function goToIndex() {
    router.push("/");
  }

  
  if (status === "Ok") {
    return (
      <>
        <Navbar />
        {/* <SideNav/> */}
        <div className={styles1.container}>
          <div className={styles1.contentContainer}>
            <div className={styles1.row}>
              <div className={styles1.col}>
                <div id="content" className={styles1.content}>
                  <div className={styles1.profile}>
                    <div className={styles1.profile_header}>
                      <div className={styles1.profile_header_cover}></div>
                      <div className={styles1.profile_header_content}>
                        <div className={styles1.profile_header_img}>
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
                                <div className={styles1.image}>
                                  <Image
                                    src={element.img}
                                    alt="Profile"
                                    objectFit="cover"
                                    width="105px"
                                    height="109px"
                                  />
                                </div>
                              );
                            })}
                        </div>
                        {userProfile[0] != undefined &&
                          userProfile.map((element) => {
                            console.log(element[0].fullName);
                            return (
                              <div className={styles1.profile_header_info}>
                                <h4 class="m-t-10 m-b-5">
                                  ???????????????????????? : {element[0].shopName}
                                </h4>
                                <p class="m-b-10">
                                  ?????????????????????????????? : {element[0].addDate}
                                </p>
                                <p class="m-b-10">
                                  ??????????????????????????????????????? : {element[0].phone}
                                </p>
                                <p class="m-b-10">
                                  ????????????????????? : {element[0].address}
                                </p>
                              </div>
                            );
                          })}

                        <div className={styles1.imagesButton}>
                          {/* <a href="#" class="btn btn-sm btn-info text-white mb-2">Edit Profile</a> */}
                          <button
                            type="button"
                            class="btn btn-info "
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            ????????????????????????
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
                                Upload Profile
                              </h5>
                              <button
                                aria-label="Close"
                                className=" close"
                                type="button"
                                onClick={() => setModalOpen(!modalOpen)}
                              >
                                <span aria-hidden={true}>??</span>
                              </button>
                            </div>
                            <ModalBody>
                              <div className={styles1.fileDropArea}>
                                <div
                                  className={styles1.imagesPreview}
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
                                  className={styles1.inputField}
                                  type="file"
                                  name="file"
                                  onChange={saveFile}
                                />
                                <div className={styles1.fakeBtn}>
                                  Choose files
                                </div>
                                <div className={styles1.msg}>
                                  or drag and drop files here
                                </div>
                              </div>
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
                        {/* </div> */}
                        {/* Setting */}
                        <div className={styles1.ButtonCss}>
                         
                          <button
                            type="button"
                            class="btn btn-info "
                            onClick={() => setModalOpenTwo(!modalOpenTwo)}
                          >
                            ????????????????????????????????????????????????
                          </button>
                          <Modal
                            toggle={() => setModalOpenTwo(!modalOpenTwo)}
                            isOpen={modalOpenTwo}
                          >
                            <div className=" modal-header">
                              <h5
                                className=" modal-title"
                                id="exampleModalLabel"
                              >
                                ????????????????????????????????????????????????
                              </h5>
                              <button
                                aria-label="Close"
                                className=" close"
                                type="button"
                                onClick={() => setModalOpenTwo(!modalOpenTwo)}
                              >
                                <span aria-hidden={true}>??</span>
                              </button>
                            </div>
                            <ModalBody>
                              <p>????????????????????????????????????</p>
                              <div className={styles1.CssInline}>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="COD"
                                  />
                                  <label class="form-check-label" for="COD">
                                    COD (?????????????????????????????????????????????)
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="Bank"
                                  />
                                  <label class="form-check-label" for="Bank">
                                    ??????????????????????????????????????????????????????????????????
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="Credit"
                                  />
                                  <label class="form-check-label" for="Credit">
                                    ??????????????????????????????/???????????????????????????
                                  </label>
                                </div>
                              </div>

                              <p className={styles1.Select}>???????????????????????????????????????</p>
                              <div className={styles1.CssInline}>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="Kerry"
                                  />
                                  <label class="form-check-label" for="Kerry">
                                    Kerry
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="ThaiPost"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="ThaiPost"
                                  >
                                    ???????????????????????????
                                  </label>
                                </div>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={() => setModalOpenTwo(!modalOpenTwo)}
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

                        {/* Promotion */}

                        <div className={styles1.ButtonCss}>
                         
                          <button
                            type="button"
                            class="btn btn-info "
                            onClick={() => setModalOpenThree(!modalOpenThree)}
                          >
                            ??????????????????????????????????????????
                          </button>
                          <Modal
                            toggle={() => setModalOpenThree(!modalOpenThree)}
                            isOpen={modalOpenThree}
                          >
                            <div className=" modal-header">
                              <h5
                                className=" modal-title"
                                id="exampleModalLabel"
                              >
                                ??????????????????????????????????????????
                              </h5>
                              <button
                                aria-label="Close"
                                className=" close"
                                type="button"
                                onClick={() => setModalOpenThree(!modalOpenThree)}
                              >
                                <span aria-hidden={true}>??</span>
                              </button>
                            </div>
                            <ModalBody>
                              
                              <div className={styles1.CssInline}>
                              <p>?????????/????????????</p>
                              <input placeholder="????????????????????????" type="text" className={styles1.input} name="start" id="start" required />
                              <input placeholder="??????????????????????????????" type="text" className={styles1.input} name="end" id="end" required />
                                
                              </div>

                              
                              <div className={styles1.CssInline}>
                              <p >????????????</p>
                              <input placeholder="??????????????????(%)" type="text" className={styles1.input} name="discount" id="discount" required />
                              </div>
                              <div className={styles1.CssInline}>
                              <p>???????????????</p>
                              <input placeholder="1" type="number"  className={styles1.input} name="num" id="num" min="1" max="1000"  required />
                              </div>
                              
                              <div className={styles1.CssInline}>
                              <p>????????????????????????</p>
                              <input placeholder="?????????????????????????????????" type="text" className={styles1.input} name="price" id="price" required />
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={() => setModalOpenThree(!modalOpenThree)}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles1.contentContainer}>
          <div className={styles1.row}>
                <div className={styles1.col}>
                    <div id="content" className={styles1.content}>
                        <div className={styles1.profile}>
                        <div className={styles1.profile_header}>
                            <div className={styles1.profile_header_cover}></div>
                            <div className={styles1.profile_header_content}>
                                <div className={styles1.profile_header_info}>
                                    <div className={styles1.profile_header_info_inline}>
                                    <h4 class="m-t-10 m-b-5">??????????????????????????????????????????</h4>
                                    </div>
                                    <div className={styles1.profile_header_info_inline}>
                                    <h4 class="m-t-10 m-b-5">?????????????????????????????????</h4>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Foot />
      </>
    );
  } else {
    return (
      <div className={styles1.ErrorPage}>
        <h1>?????????????????????????????????????????????</h1>
        <button
          type="submit"
          className="btn btn-primary"
          onMouseDown={() => {
            goToIndex();
          }}
        >
          OK
        </button>
      </div>
    );
  }
}
