import Navbar from '../../Components/Navbar/nav'
import SideNav from '../SideNavBar/sideNav'
import Styles1 from './Profile.module.css'
import Foot from '../Footer/Footer'
import Popup from 'reactjs-popup'


export default function Profile() {
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
              <div  method="" className={Styles1.form}>
                <input type="text" id='Name' placeholder=' โปรดใส่ชื่อใหม่' required/>
                <input type="date" id='BirthDate' placeholder=' โปรดใส่วันที่เกิด' required/>
                 <div className={Styles1.form__gender}>
                  <input type="radio" id='gender' value='male'>ชาย</input>
                  <input type="radio" id='gender' value='female'>หญิง</input>
                  <input type="radio" id='gender' value='none'>ไม่ระบุ</input>
                </div>
                <button type='submit' className='btn btn-primary' onClick={()=> {RegClick()}}>ยืนยัน</button> 
              </div> 
            </div>  
          </Popup>
        
        <button>คูปองของฉัน</button>
        </div>
    </div>
    <div className={Styles1.Container__Info}>
        <h1>ที่อยู่ของฉัน</h1>
        <button>เพิ่มที่อยู่</button>

    </div>
    <Foot/>
    </> 
 
  )
}