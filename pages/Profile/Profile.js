import Navbar from '../../Components/Navbar/nav'
import SideNav from '../SideNavBar/sideNav'
import Styles1 from './Profile.module.css'


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
        <button>แก้ไข</button>
        <button>คูปองของฉัน</button>
        </div>
    </div>
    <div className={Styles1.Container__Info}>
        <h1>ที่อยู่ของฉัน</h1>
        <button>เพิ่มที่อยู่</button>

    </div>
    </> 
 
  )
}