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
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [role, setRole] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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
        setListProfile([result.data]);
      })
      .catch((err) => {
        // Localhost ios issus
        console.log(err);
        axios
          .get("/api/userSeller")
          .then((result) => {
            // setListProfile( result.data )
            console.log([result.data]);
            setListProfile([result.data]);
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
      setName(localStorage.getItem("Name"));
      setEmail(localStorage.getItem("Email"));
      setRole(localStorage.getItem("Role"));
      setAddress(localStorage.getItem("Address"));
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
                          {listProfile[0] === undefined && (
                            <div>
                              <Image
                                src={Pro}
                                alt="Profile"
                                objectFit="cover"
                              />
                            </div>
                          )}
                          {listProfile[0] != undefined &&
                            listProfile.map((element) => {
                              console.log(element[0].img);
                              return (
                                <div className={styles1.image}>
                                  <Image
                                    src={element[0].img}
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
                                  ชื่อร้าน : {element[0].shopName}
                                </h4>
                                <p class="m-b-10">
                                  สร้างเมื่อ : {element[0].addDate}
                                </p>
                                <p class="m-b-10">
                                  เบอร์โทรศัพท์ : {element[0].phone}
                                </p>
                                <p class="m-b-10">
                                  ที่อยู่ : {element[0].address}
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
                            เลือกรูป
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
                                <span aria-hidden={true}>×</span>
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
                        <div className={styles1.ButtonCss}>
                          {/* <a href="#" class="btn btn-sm btn-info text-white mb-2">Edit Profile</a> */}
                          <button
                            type="button"
                            class="btn btn-info "
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            ตั้งค่าเพิ่มเติม
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
                                ตั้งค่าเพิ่มเติม
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
                              <p>วิธีชำระเงิน</p>
                              <div className={styles1.CssInline}>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="COD"
                                  />
                                  <label class="form-check-label" for="COD">
                                    COD (เก็บเงินปลายทาง)
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
                                    โอนชำระผ่านบัญชีธนาคาร
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
                                    บัตรเครดิต/บัตรเดบิต
                                  </label>
                                </div>
                              </div>

                              <p className={styles1.Select}>วิธีการจัดส่ง</p>
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
                                    ไปรษณีไทย
                                  </label>
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

                        <div className={styles1.ButtonCss}>
                          <Button color="info" type="button">
                            สร้างโปรโมชั่น
                          </Button>
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
        <h1>กลับสู่หน้าหลัก</h1>
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
