import Navbar from '../../Components/Navbar/nav'
import SideNav from '../SideNavBar/sideNav'
import Styles1 from './Profile.module.css'
import Foot from '../Footer/Footer'
import Popup from 'reactjs-popup'
import axios from 'axios'
import { useRouter } from 'next/router'



export default function Profile() {
 const router = useRouter();
  function EditProClick(){
    const url = 'http://localhost:3000/api/editProfileClick'
    const NewName = document.querySelector('#newName').value
    const NewDate = document.querySelector('#newBirthDate').value
    const NewTel = document.querySelector('#newTel').value
    const NewGender = document.querySelector('#newGender').value    
   
    axios.post(url, {
      name: NewName,
      date: NewDate,
      tel: NewTel,
      gender: NewGender

    }).then((response) => {
      router.push('../Profile/Profile')
      
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

    }).catch((error) => {

    })
  }
 
  return (
    <>
    <Navbar/>
    <SideNav/>
    <div className={Styles1.Container__Me}>
        <div className={Styles1.Container__Me__In}>
            <h1>Picture</h1>
        </div>
        <div className={Styles1.Container__Me__In}>
            <h1>ชื่อผู้ใช้ :</h1>
            <h1>อีเมล :</h1>
            <h1>วัน/เดือน/ปี เกิด :</h1>
            <h1>เพศ :</h1>
            
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
    </div>
    <Foot/>
    </> 
 
  )
}