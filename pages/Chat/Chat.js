import styles1 from './Chat.module.css'
import SideNav from '../SideNavBar/sideNav'
import Nav from '../../Components/Navbar/nav'
import Foot from '../Footer/Footer'

export default function Chat(){
    return(
        <>
        <div>
            <Nav/>
            <SideNav/>
            <h1>    This is a Chat Page     </h1>
        </div>
        <Foot/>
        </>
    )
}