import styles1 from './Cart.module.css'
import SideBar from '../SideNavBar/sideNav'
import Nav from '../../Components/Navbar/nav'
import Foot from '../Footer/Footer'

export default function Cart() {
    return(
        <>
        <div>
            <Nav/>
            <SideBar/>
            <h1>This is a Cart Page</h1>
        </div>
        <Foot/>
        </>
    )
}