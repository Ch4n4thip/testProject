import Link from "next/link";
import NavL from "../Components/Navbar/navLogin";
import Footer from "../pages/Footer/Footer"

export default function Login() {
    return ( <>
  
    <NavL/> 
    <body>
      <div className="form__login"> 
        <form action="" >
          <input type="text" name='Email' placeholder='โปรดใส่อีเมล' required/>
          <input type="password" name='Password' placeholder='โปรดใส่รหัสผ่าน' required/>
          <button type='submit' className='btn btn-primary'>เข้าสู่ระบบ</button> 
        </form>
          <Link href="/Register/Register"><p>สมัครบัญชีใหม่</p></Link>
      </div> 
    </body>
      <Footer/>
      </>
    );
  }
