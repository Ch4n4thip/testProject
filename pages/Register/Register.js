import Link from "next/link";
import Navbar from "../../Components/Navbar/navLogin";
import Footer from "../Footer/Footer";

export default function Register() {
    return (
      <>
      

      <div>
        <Navbar/>
        <section>
          <div>
          <form action="" className="form__register">
          <input type="text" name='Name' placeholder='โปรดใส่ชื่อ' required/>
          <input type="text" name='Email' placeholder='โปรดใส่อีเมล' required/>
          <input type="password" name='Password' placeholder='โปรดใส่รหัสผ่าน' required/>
          <button type='submit' className='btn btn-primary'>ดำเนินการต่อ</button> 
        </form>
          </div>
        </section>
         <Link href="/Register/Verify"><p>ต่อไป</p></Link> 
        
      </div>
      <Footer/>
      </>
    );
  }

