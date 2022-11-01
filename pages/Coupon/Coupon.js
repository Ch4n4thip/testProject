import styles1 from './Coupon.module.css'
import SideNav from '../SideNavBar/sideNav'
import Nav from '../../Components/Navbar/nav'
import Foot from '../Footer/Footer'

export default function Coupon(){
    return(
        <>
            <div>
                <Nav/>
                <SideNav/>
                <h1>    This is a Coupon Page   </h1>
            </div>
            <Foot/>
        </>
    )
}