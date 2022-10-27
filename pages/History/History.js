import styles1 from './History.module.css'
import SideNav from '../SideNavBar/sideNav'
import Nav from '../../Components/Navbar/nav'
import Foot from '../Footer/Footer'

export default function History() {
    return(
        <>
            <div>
                <Nav/>
                <SideNav/>
                <h1>    This is a History Page  </h1>
            </div>
            <Foot/>
        </>
    ) 
}