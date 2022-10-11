import Styles1 from './Return.module.css'
import Nav from '../../Components/Navbar/nav'
import SideBar from '../SideNavBar/sideNav'

export default function Return() {
    return(
    <>
        <Nav/>
        <SideBar />
        <div className={Styles1.Container}>
            <div className={Styles1.SubContainer}>
                <h1>Pic</h1>
                <button type='submit' className='btn btn-primary'>เลือกรูป</button>
            </div>
            <div className={Styles1.SubContainer}>
                <input type='text' placeholder='DropDown'></input>
                <textarea type='area'></textarea>
                <button type='submit' className='btn btn-primary'>ยืนยัน</button>
            </div>
        </div>
    </>
    )
}