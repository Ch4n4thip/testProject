import Navbar from '../../Components/Navbar/nav'
import SideNav from '../SideNavBar/sideNav'
import Styles1 from './Profile.module.css'
import Foot from '../Footer/Footer'
import Popup from 'reactjs-popup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect , useState } from 'react'




export default function Profile() {
 const router = useRouter();
 const [ name , setName ] = useState("");
 const [ email , setEmail ] = useState("");
 const [ role , setRole ] = useState("");
 const [ tel , setTel ] = useState("");
 const [ birthdate , setBirthDate ] = useState("");
 const [ gender , setGender ] = useState("");
 const [ address , setAddress ] = useState("");

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



 
  function goToIndex(){
    router.push('/')
  }

  function EditProClick(){
    const url = 'http://localhost:3000/api/editProfileClick'
    const Email = email
    const NewName = document.querySelector('#newName').value
    const NewDate = document.querySelector('#newBirthDate').value
    const NewTel = document.querySelector('#newTel').value
    const NewGender = document.querySelector('#newGender').value    
   
    axios.post(url, {
      Email: Email ,
      name: NewName,
      date: NewDate,
      tel: NewTel,
      gender: NewGender

    }).then((response) => {
      window.location.reload(false)
      
      console.log(response.data)
    }).catch((error) => {
      router.push('./Profile')
      console.log(error.response.data)
    })
  }

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
            <h1>Picture</h1>
        </div>
        <div className={Styles1.Container__Me__In}>
            <p>ชื่อผู้ใช้ : {name}</p>
            <p>อีเมล : {email}</p>
            <p>ว/ด/ป เกิด  : {birthdate}</p>
            <p>เพศ : {gender}</p>
            
        </div>
        <div className={Styles1.Container__Me__In}>
          <Popup trigger={<button>แก้ไข</button>} position="left center" >
            <div className={Styles1.Popup__container}>
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
                <button type='submit' className='btn btn-primary' onMouseDown={()=> {EditProClick()} }>ยืนยัน</button> 
              </form> 
            </div>  
          </Popup>
        
        <button>คูปองของฉัน</button>
        </div>
    </div>
    <div className={Styles1.Container__Info}>
        <h1>ที่อยู่ของฉัน</h1>
        <div className={Styles1.Container__info__button}>
        <Popup trigger={<button>เพิ่มที่อยู่</button>} position="left center" >
            <div className={Styles1.Popup__container2}>
              <form  action='./Profile' method="" className={Styles1.form}>
                <input type="text" id='newAddress' placeholder=' โปรดใส่ที่อยู่' required/>
                <button type='submit' className='btn btn-primary' onMouseDown={()=> {AddAddress()} }>ยืนยัน</button> 
              </form> 
            </div>  
          </Popup>
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